import { motion } from 'framer-motion';

const ActivityTimeline = ({ activity }) => {
    // Mock timeline data - in real app this would come from props/API
    const timelineEvents = [
        {
            id: 1,
            type: 'login',
            message: 'Logged in to SafeLynx',
            time: '2 hours ago',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
            ),
            color: 'text-emerald-600 dark:text-emerald-400',
            bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
        },
        {
            id: 2,
            type: 'upload',
            message: 'Uploaded Degree Certificate.pdf',
            time: '3 hours ago',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
            ),
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        },
        {
            id: 3,
            type: 'share',
            message: 'Shared document with team@example.com',
            time: '1 day ago',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
            ),
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        },
        {
            id: 4,
            type: 'delete',
            message: 'Deleted old tax document',
            time: '2 days ago',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            ),
            color: 'text-rose-600 dark:text-rose-400',
            bgColor: 'bg-rose-100 dark:bg-rose-900/30',
        },
    ];

    return (
        <div className="card p-6 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recent Activity
            </h3>

            <div className="relative space-y-4">
                {/* Timeline line */}
                <div className="absolute left-[13px] top-8 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>

                {timelineEvents.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative flex gap-4"
                    >
                        {/* Icon */}
                        <div className={`relative z-10 flex-shrink-0 w-7 h-7 rounded-full ${event.bgColor} ${event.color} flex items-center justify-center`}>
                            {event.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {event.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {event.time}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {timelineEvents.length === 0 && (
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-8">
                    No recent activity
                </p>
            )}
        </div>
    );
};

export default ActivityTimeline;
