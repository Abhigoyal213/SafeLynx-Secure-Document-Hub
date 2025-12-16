import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { notificationApi } from '../api/notifications';

const NotificationBell = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const fetchNotifications = async () => {
        try {
            const data = await notificationApi.getNotifications();
            setNotifications(data);
            setUnreadCount(data.filter(n => !n.isRead).length);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Poll for new notifications every minute
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = async () => {
        const newState = !isOpen;
        setIsOpen(newState);

        if (newState && unreadCount > 0) {
            try {
                await notificationApi.markAllAsRead();
                setUnreadCount(0);
                // We don't refresh the list immediately to keep the "new" styling visible 
                // until likely the next refresh or user interaction updates it.
                // But for "unread count resets", we do setUnreadCount(0).
                // Optionally update local state to reflect read:
                setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            } catch (error) {
                console.error('Failed to mark all as read:', error);
            }
        }
    };

    const handleNotificationClick = async (notification) => {
        try {
            if (!notification.isRead) {
                await notificationApi.markAsRead(notification._id);
                setNotifications(prev =>
                    prev.map(n => n._id === notification._id ? { ...n, isRead: true } : n)
                );
            }
            setIsOpen(false);
            if (notification.documentId) {
                // Handle populated object or just ID
                const docId = typeof notification.documentId === 'object'
                    ? notification.documentId._id
                    : notification.documentId;
                navigate(`/documents/${docId}`);
            }
        } catch (error) {
            console.error('Failed to handle notification click:', error);
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'upload':
                return (
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                );
            case 'share':
                return (
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                );
            case 'update':
                return (
                    <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                );
        }
    };

    // Calculate time ago
    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return "Just now";
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggle}
                className="relative p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Notifications"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center border-2 border-white dark:border-slate-800">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                        exit={{ opacity: 0, y: 10, scale: 0.95, x: '-50%' }}
                        transition={{ duration: 0.2 }}
                        // Responsive positioning:
                        // Mobile: centered fixed/absolute
                        // Desktop: right-0
                        className="
                            absolute z-50 mt-2 
                            left-1/2 md:left-auto md:right-0 md:transform-none md:translate-x-0
                            w-[90vw] max-w-sm md:w-80 
                            bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden
                        "
                        style={{
                            // Ensure it respects the parent's generic positioning context if needed, 
                            // but usually 'absolute' + standard tailwind classes is enough.
                            // Resetting translateX for desktop:
                        }}
                    >
                        {/* Triangle indicator - Hidden on mobile, visible on desktop aligned with bell */}
                        <div className="hidden md:block absolute top-0 right-3 w-4 h-4 -mt-2 rotate-45 bg-white dark:bg-slate-800 border-l border-t border-slate-200 dark:border-slate-700"></div>

                        <div className="relative bg-white dark:bg-slate-800 z-10">
                            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                                {notifications.length > 0 && (
                                    <button
                                        onClick={async () => {
                                            try {
                                                await notificationApi.markAllAsRead();
                                                setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
                                                setUnreadCount(0);
                                            } catch (e) { console.error(e); }
                                        }}
                                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                                    >
                                        Mark all as read
                                    </button>
                                )}
                            </div>

                            <div className="max-h-[400px] overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((notif) => (
                                        <div
                                            key={notif._id}
                                            onClick={() => handleNotificationClick(notif)}
                                            className={`
                                                relative p-4 border-b border-slate-100 dark:border-slate-700 
                                                hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer 
                                                group
                                                ${!notif.isRead ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}
                                            `}
                                        >
                                            <div className="flex gap-3">
                                                <div className="flex-shrink-0 mt-0.5">{getIcon(notif.type)}</div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-gray-900 dark:text-white font-medium whitespace-normal break-words leading-snug">
                                                        {/* Display sender name if available */}
                                                        {notif.sender && (
                                                            <span className="font-bold">{notif.sender.name || 'Someone'} </span>
                                                        )}
                                                        {notif.message}
                                                    </p>
                                                    {notif.documentId && typeof notif.documentId === 'object' && (
                                                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-1 truncate">
                                                            Doc: {notif.documentId.title}
                                                        </p>
                                                    )}
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        {timeAgo(notif.createdAt)}
                                                    </p>
                                                </div>
                                                {!notif.isRead && (
                                                    <div className="flex-shrink-0 self-center">
                                                        <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 ring-2 ring-indigo-100 dark:ring-indigo-900"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center">
                                        <div className="bg-slate-50 dark:bg-slate-800/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                                            No notifications
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            We'll let you know when something arrives
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationBell;
