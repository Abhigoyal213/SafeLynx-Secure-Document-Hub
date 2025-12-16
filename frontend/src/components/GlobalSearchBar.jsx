import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchDocumentTypes } from '../api/documents';

const GlobalSearchBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('search') || '');
    const [placeholder, setPlaceholder] = useState('Search documents...');

    useEffect(() => {
        setQuery(searchParams.get('search') || '');
    }, [searchParams]);

    useEffect(() => {
        const loadHints = async () => {
            try {
                const { data } = await fetchDocumentTypes();
                if (data.types && data.types.length > 0) {
                    // Take up to 3 types
                    const hints = data.types.slice(0, 3).join(', ');
                    setPlaceholder(`Search ${hints}...`);
                }
            } catch (err) {
                console.error('Failed to load search hints:', err);
            }
        };
        loadHints();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.trim()) {
            setSearchParams((prev) => {
                prev.set('search', value);
                return prev;
            }, { replace: true });
        } else {
            setSearchParams((prev) => {
                prev.delete('search');
                return prev;
            }, { replace: true });
        }
    };

    const clearSearch = () => {
        setQuery('');
        setSearchParams((prev) => {
            prev.delete('search');
            return prev;
        }, { replace: true });
    };

    return (
        <div className="relative w-full max-w-md">
            <div className="relative">
                <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleSearch}
                    autoComplete="off"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default GlobalSearchBar;
