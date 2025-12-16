import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { uploadDocument } from '../api/documents';
import FileUpload from '../components/FileUpload';

const SUB_CATEGORIES = {
  government: ['Aadhaar', 'PAN', 'Driving License', 'Passport', 'APAAR ID', 'Electricity Bill', 'Others'],
  professional: ['Resume', 'Offer Letter', 'Internship Certificate', 'Experience Letter', 'Salary Slip', 'Others'],
  personal: ['Photos', 'Certificates', 'Notes', 'Medical Records', 'Others'],
};

const UploadPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // State 'files' replaces 'file'
  const [form, setForm] = useState({ title: '', category: '', subCategory: '', tags: '' });
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.category) {
      setForm((prev) => ({ ...prev, category: location.state.category }));
    }
  }, [location.state]);

  const handleFilesSelect = (selectedFiles) => {
    // selectedFiles is an array. Append to existing or replace? 
    // Usually users expect replace if they click upload again, or append?
    // Let's support append for better UX (drag more files).
    // But we must deduplicate by name to avoid confusion?
    setFiles((prev) => [...prev, ...(Array.isArray(selectedFiles) ? selectedFiles : [selectedFiles])]);
  };

  const removeFile = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setError('Please select at least one file to upload');
      return;
    }
    if (!form.category) {
      setError('Please select a category');
      return;
    }
    if ((form.category === 'government' || form.category === 'professional') && !form.subCategory) {
      setError(`Please select a ${form.category} document type`);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = new FormData();

      // Append all files. Multer array('files') expects same field name.
      files.forEach(file => {
        data.append('files', file);
      });

      // If user gives a title, it will be used as prefix for multiple files
      const finalTitle = form.title.trim();
      data.append('title', finalTitle);
      data.append('category', form.category);
      data.append('subCategory', form.subCategory);
      data.append('tags', form.tags);

      await uploadDocument(data);
      window.dispatchEvent(new Event('storageUpdated'));
      setMessage(`Successfully uploaded ${files.length} document(s)!`);
      setFiles([]);
      setForm({ title: '', category: '', subCategory: '', tags: '' });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setMessage('');
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value, subCategory: '' });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Upload Document
        </h1>
        <p className="text-slate-600">Add new documents to your secure vault</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6 sm:p-8 border-0 bg-white/80 dark:bg-[#1A1A1D] backdrop-blur-sm shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Category *</label>
                <select
                  className="w-full rounded-xl border border-slate-200 dark:border-gray-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-[#18181B] text-slate-900 dark:text-white"
                  value={form.category}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="" disabled>Select Category</option>
                  <option value="personal">Personal Documents</option>
                  <option value="professional">Professional Documents</option>
                  <option value="government">Government Documents</option>
                </select>
              </div>

              {form.category && (
                <div className="space-y-2 animate-slide-in-right">
                  <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
                    {form.category.charAt(0).toUpperCase() + form.category.slice(1)} Document Type
                    {(form.category === 'government' || form.category === 'professional') ? ' *' : ' (Optional)'}
                  </label>
                  <select
                    className="w-full rounded-xl border border-slate-200 dark:border-gray-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-[#18181B] text-slate-900 dark:text-white"
                    value={form.subCategory}
                    onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
                    required={form.category === 'government' || form.category === 'professional'}
                  >
                    <option value="" disabled={form.category === 'government' || form.category === 'professional'}>
                      {(form.category === 'government' || form.category === 'professional') ? 'Select Type' : 'Select Type (None)'}
                    </option>
                    {SUB_CATEGORIES[form.category]?.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Document Title</label>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-200 dark:border-gray-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-[#18181B] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500"
                placeholder={files.length > 1 ? "Shared title prefix (e.g. 'Vacation Photos')" : "e.g., My Aadhaar Card"}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <p className="text-xs text-slate-500 dark:text-gray-500">
                {files.length > 1 ? "Will be prefixed to filenames for multiple files" : "Leave blank to use filename"}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Tags</label>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-200 dark:border-gray-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-[#18181B] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500"
                placeholder="e.g., important, verified, personal (comma separated)"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
              <p className="text-xs text-slate-500 dark:text-gray-500">Add tags to help you find documents quickly</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Files * {files.length > 0 && `(${files.length})`}</label>
              <FileUpload onSelect={handleFilesSelect} />

              {/* File List */}
              {files.length > 0 && (
                <div className="flex flex-col gap-2 mt-4">
                  {files.map((file, idx) => (
                    <div key={`${file.name}-${idx}`} className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 flex items-center gap-3 animate-fadeIn">
                      <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{file.name}</p>
                        <p className="text-xs text-slate-500 dark:text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="p-2 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/40 text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {message && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/30">
                <p className="text-sm text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {message}
                </p>
              </div>
            )}

            {error && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-900/30">
                <p className="text-sm text-rose-700 dark:text-rose-400 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            <button
              className="btn btn-primary w-full py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || files.length === 0}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading {files.length} file(s)...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload {files.length > 0 ? `${files.length} Document${files.length > 1 ? 's' : ''}` : 'Document'}
                </span>
              )}
            </button>
          </form>
        </div>

        <div className="card p-6 border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 shadow-xl">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Upload Tips
          </h3>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>You can select multiple files at once!</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Use clear, descriptive titles like "Passport" or "PAN Card"</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Add tags to quickly search and filter documents later</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Supported formats: PDF, JPG, PNG, DOC, XLS, TXT (max 10 MB)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
