const FileTypeIcon = ({ fileName, className = 'w-6 h-6' }) => {
    const getIconAndColor = () => {
        const extension = fileName?.split('.').pop()?.toLowerCase();

        switch (extension) {
            case 'pdf':
                return {
                    color: 'text-rose-600',
                    icon: (
                        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                            <path d="M14 2v6h6" />
                            <text x="50%" y="65%" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">
                                PDF
                            </text>
                        </svg>
                    ),
                };
            case 'doc':
            case 'docx':
                return {
                    color: 'text-blue-600',
                    icon: (
                        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                            <path d="M14 2v6h6M10 18v-8M14 18v-8" />
                        </svg>
                    ),
                };
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'svg':
            case 'webp':
                return {
                    color: 'text-emerald-600',
                    icon: (
                        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    ),
                };
            case 'zip':
            case 'rar':
            case '7z':
                return {
                    color: 'text-amber-600',
                    icon: (
                        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                    ),
                };
            case 'xls':
            case 'xlsx':
                return {
                    color: 'text-green-600',
                    icon: (
                        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                            <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
                        </svg>
                    ),
                };
            default:
                return {
                    color: 'text-gray-600',
                    icon: (
                        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    ),
                };
        }
    };

    const { color, icon } = getIconAndColor();

    return <div className={color}>{icon}</div>;
};

export default FileTypeIcon;
