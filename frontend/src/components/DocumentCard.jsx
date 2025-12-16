import { useState } from 'react';
import { Link } from 'react-router-dom';
import { renameDocument } from '../api/documents';

const categoryColor = {
  personal: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  professional: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
  government: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
  others: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
};

const getFileIcon = (fileUrl) => {
  if (fileUrl?.endsWith('.pdf')) {
    return 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z';
  }
  return 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z';
};

const formatFileSize = (bytes) => {
  if (!bytes) return '—';
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const DocumentCard = ({ doc, onDelete }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [displayTitle, setDisplayTitle] = useState(doc.title);
  const [newTitle, setNewTitle] = useState(doc.title);
  const [isLoading, setIsLoading] = useState(false);

  const handleRename = async () => {
    const trimmed = newTitle.trim();
    if (!trimmed || trimmed === displayTitle) {
      setIsRenaming(false);
      return;
    }
    if (trimmed.length > 100) {
      alert('Title too long (max 100 chars)');
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await renameDocument(doc._id, trimmed);
      setDisplayTitle(data.document.title);
      setIsRenaming(false);
    } catch (error) {
      console.error('Rename failed', error);
      alert('Failed to rename document');
      setNewTitle(displayTitle); // Revert
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="card p-5 flex flex-col gap-4 hover:shadow-lg transition-all duration-300 border-0 bg-white/80 dark:bg-[#141417] backdrop-blur-sm group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-3 rounded-xl ${(categoryColor[doc.category] || categoryColor.others).split(' ')[0]} bg-opacity-10 flex-shrink-0 dark:bg-opacity-20`}>
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getFileIcon(doc.fileUrl)} />
            </svg>
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            {isRenaming ? (
              <div className="flex flex-col gap-2 w-full animate-fadeIn">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newTitle.trim() && newTitle.trim() !== displayTitle) handleRename();
                    if (e.key === 'Escape') {
                      setNewTitle(displayTitle);
                      setIsRenaming(false);
                    }
                  }}
                  autoFocus
                  disabled={isLoading}
                  className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base border-b border-indigo-500 focus:outline-none bg-transparent w-full pb-1"
                  placeholder="Enter document name"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRename}
                    disabled={isLoading || !newTitle.trim() || newTitle.trim() === displayTitle}
                    className="px-3 py-1 text-xs font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setNewTitle(displayTitle);
                      setIsRenaming(false);
                    }}
                    disabled={isLoading}
                    className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <span
                className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base line-clamp-2 break-all leading-tight"
                title={displayTitle}
              >
                {displayTitle}
              </span>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-500 dark:text-gray-500 font-medium bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                {formatFileSize(doc.fileSize)}
              </span>
              <span className="text-xs text-slate-400 dark:text-gray-500">•</span>
              <span className="text-xs text-slate-500 dark:text-gray-400">
                {new Date(doc.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {doc.isShared && (
            <span className="px-3 py-1 rounded-full text-xs font-medium border bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800 whitespace-nowrap">
              Shared by {doc.uploadedBy?.name?.split(' ')[0] || 'User'}
            </span>
          )}
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColor[doc.category] || categoryColor.others} capitalize`}>
            {doc.subCategory || 'Other'}
          </span>
          {!doc.isShared && (
            <Link
              to={`/documents/${doc._id}`}
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
              title="Share Document"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {doc.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {doc.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
              {tag}
            </span>
          ))}
          {doc.tags.length > 3 && (
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
              +{doc.tags.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-gray-800">
        <Link
          to={`/documents/${doc._id}`}
          className="flex-1 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 font-medium text-sm hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors text-center"
        >
          View
        </Link>
        <a
          href={doc.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="p-2 sm:px-4 sm:py-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          title="Download"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
        {!doc.isShared && (
          <button
            onClick={() => {
              setIsRenaming(true);
              setNewTitle(displayTitle);
            }}
            className="p-2 sm:px-4 sm:py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
            title="Rename"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
        {!doc.isShared && onDelete && (
          <button
            onClick={() => onDelete(doc._id)}
            className="p-2 sm:px-4 sm:py-2 rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-medium text-sm hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
            title="Delete"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;

