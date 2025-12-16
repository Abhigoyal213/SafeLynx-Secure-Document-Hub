import { useState } from 'react';
import { motion } from 'framer-motion';

const DocumentTagging = ({ selectedTags = [], onChange }) => {
    const availableTags = [
        { id: 'important', label: 'Important', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
        { id: 'college', label: 'College', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
        { id: 'id-proof', label: 'ID Proof', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
        { id: 'medical', label: 'Medical', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
        { id: 'personal', label: 'Personal', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
        { id: 'work', label: 'Work', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },
    ];

    const toggleTag = (tagId) => {
        if (selectedTags.includes(tagId)) {
            onChange(selectedTags.filter((id) => id !== tagId));
        } else {
            onChange([...selectedTags, tagId]);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags</label>
            <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag.id);
                    return (
                        <motion.button
                            key={tag.id}
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleTag(tag.id)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${isSelected
                                    ? tag.color + ' ring-2 ring-offset-2 ring-current'
                                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            {tag.label}
                            {isSelected && (
                                <svg className="inline-block w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

export default DocumentTagging;
