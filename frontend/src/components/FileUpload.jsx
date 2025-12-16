import { useState, useRef } from 'react';

const FileUpload = ({ onSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    // Convert FileList to Array
    const files = Array.from(e.dataTransfer.files);

    // Allowed MIME types prefix or exact match
    const allowedTypes = [
      'application/pdf',
      'image/',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain'
    ];

    const validFiles = files.filter(file => {
      return allowedTypes.some(type =>
        type.endsWith('/') ? file.type.startsWith(type) : file.type === type
      );
    });

    if (validFiles.length > 0) {
      onSelect(validFiles);
      if (validFiles.length < files.length) {
        console.warn('Some files were ignored due to unsupported type.');
      }
    }
  };

  const handleFileSelect = (e) => {
    e.stopPropagation();
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onSelect(files);
      // Reset input
      e.target.value = '';
    }
  };

  const handleBoxClick = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`
        relative block w-full p-8 sm:p-12 rounded-2xl border-2 border-dashed cursor-pointer
        transition-all duration-200
        ${isDragging
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500 scale-[1.02]'
          : 'border-slate-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/20'
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleBoxClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="application/pdf,image/*,.doc,.docx,.xls,.xlsx,.txt"
        className="hidden"
        onChange={handleFileSelect}
        onClick={(e) => e.stopPropagation()} // Prevent bubbling from input click
      />
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 mb-2">
          <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
            {isDragging ? 'Drop file here' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-sm text-slate-500 dark:text-gray-400">
            PDF, PNG, JPG, DOC, XLS, TXT up to 10 MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;

