import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const DocumentPreviewModal = ({ isOpen, onClose, document }) => {
    const [activeTab, setActiveTab] = useState('preview');

    if (!isOpen || !document) return null;

    const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(document.fileName);
    const isPDF = /\.pdf$/i.test(document.fileName);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-4 md:inset-8 lg:inset-16 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200 dark:border-slate-700">
                            <div className="flex-1 min-w-0">
                                <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white truncate">
                                    {document.fileName}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {document.category} • {document.size}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <a
                                    href={document.fileUrl}
                                    download
                                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                    title="Download"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </a>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-slate-200 dark:border-slate-700 px-4 md:px-6">
                            <button
                                onClick={() => setActiveTab('preview')}
                                className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'preview'
                                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                    }`}
                            >
                                Preview
                            </button>
                            <button
                                onClick={() => setActiveTab('details')}
                                className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'details'
                                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                    }`}
                            >
                                Details
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-auto p-4 md:p-6 bg-slate-50 dark:bg-slate-800/50">
                            {activeTab === 'preview' && (
                                <div className="h-full flex items-center justify-center">
                                    {isImage ? (
                                        <img
                                            src={document.fileUrl}
                                            alt={document.fileName}
                                            className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                                        />
                                    ) : isPDF ? (
                                        <iframe
                                            src={document.fileUrl}
                                            className="w-full h-full rounded-lg shadow-lg"
                                            title={document.fileName}
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                                Preview not available for this file type
                                            </p>
                                            <a
                                                href={document.fileUrl}
                                                download
                                                className="btn btn-primary"
                                            >
                                                Download to View
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'details' && (
                                <div className="space-y-4">
                                    <div className="card p-4">
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">File Information</h3>
                                        <dl className="space-y-3">
                                            <div className="flex justify-between">
                                                <dt className="text-sm text-gray-500 dark:text-gray-400">File Name</dt>
                                                <dd className="text-sm font-medium text-gray-900 dark:text-white">{document.fileName}</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-sm text-gray-500 dark:text-gray-400">Category</dt>
                                                <dd className="text-sm font-medium text-gray-900 dark:text-white">{document.category}</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-sm text-gray-500 dark:text-gray-400">Size</dt>
                                                <dd className="text-sm font-medium text-gray-900 dark:text-white">{document.size || 'Unknown'}</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-sm text-gray-500 dark:text-gray-400">Uploaded</dt>
                                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {document.createdAt ? new Date(document.createdAt).toLocaleDateString() : 'Unknown'}
                                                </dd>
                                            </div>
                                            {document.description && (
                                                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                                                    <dt className="text-sm text-gray-500 dark:text-gray-400 mb-1">Description</dt>
                                                    <dd className="text-sm text-gray-900 dark:text-white">{document.description}</dd>
                                                </div>
                                            )}
                                        </dl>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default DocumentPreviewModal;
