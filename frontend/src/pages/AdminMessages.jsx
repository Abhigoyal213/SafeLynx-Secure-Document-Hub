import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchContacts, markContactRead, deleteContact } from '../api/contact';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadMessages = async () => {
        try {
            setLoading(true);
            const { data } = await fetchContacts();
            setMessages(data.contacts);
        } catch (err) {
            setError('Failed to fetch messages');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    const handleMarkRead = async (id) => {
        try {
            await markContactRead(id);
            setMessages((prev) =>
                prev.map((msg) => (msg._id === id ? { ...msg, isRead: true } : msg))
            );
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;
        try {
            await deleteContact(id);
            setMessages((prev) => prev.filter((msg) => msg._id !== id));
        } catch (err) {
            alert('Failed to delete message');
        }
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Messages</h1>
                <p className="text-slate-600 dark:text-slate-400">View and manage contact inquiries</p>
            </div>

            <div className="bg-white dark:bg-[#1A1A1D] rounded-2xl border border-slate-200 dark:border-gray-800 overflow-hidden shadow-sm">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading messages...</div>
                ) : error ? (
                    <div className="p-8 text-center text-rose-500">{error}</div>
                ) : messages.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No messages found.</div>
                ) : (
                    <div className="divide-y divide-slate-100 dark:divide-gray-800">
                        {messages.map((msg) => (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                key={msg._id}
                                className={`p-6 transition-colors ${!msg.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                            >
                                <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-start mb-3">
                                    <div>
                                        <h3 className={`font-semibold text-lg ${!msg.isRead ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                                            {msg.name}
                                            {!msg.isRead && (
                                                <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">New</span>
                                            )}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-gray-400">{msg.email}</p>
                                    </div>
                                    <div className="text-xs text-slate-400 whitespace-nowrap">
                                        {new Date(msg.createdAt).toLocaleString()}
                                    </div>
                                </div>
                                <p className="text-slate-700 dark:text-gray-300 whitespace-pre-wrap mb-4 leading-relaxed">
                                    {msg.message}
                                </p>
                                <div className="flex items-center gap-3 mt-4">
                                    {!msg.isRead && (
                                        <button
                                            onClick={() => handleMarkRead(msg._id)}
                                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                                        >
                                            Mark as Read
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(msg._id)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-rose-100 hover:text-rose-600 transition-colors"
                                    >
                                        Delete
                                    </button>
                                    <a
                                        href={`mailto:${msg.email}`}
                                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors ml-auto"
                                    >
                                        Reply via Email
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminMessages;
