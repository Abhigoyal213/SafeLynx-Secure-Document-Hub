import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchStorageUsage } from '../api/documents';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();
  const [storage, setStorage] = useState({ used: 0, total: 3221225472 });

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { to: '/upload', state: { category: 'personal' }, label: 'Upload', icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' },
    { to: '/settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  if (user?.role === 'admin') {
    navItems.push({
      to: '/admin/messages',
      label: 'Messages',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    });
  }

  const getStorage = async () => {
    try {
      const { data } = await fetchStorageUsage();
      setStorage(data);
    } catch (error) {
      console.error('Failed to fetch storage usage', error);
    }
  };

  useEffect(() => {
    getStorage();
    // Listen for update events
    window.addEventListener('storageUpdated', getStorage);
    return () => window.removeEventListener('storageUpdated', getStorage);
  }, []);
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : (window.innerWidth >= 1024 ? 0 : -300) }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-20
          w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700
          flex flex-col shadow-xl lg:shadow-none
        `}
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.to}
                state={item.state}
                onClick={() => setIsOpen && setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`
                }
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.label}
              </NavLink>
            </motion.div>
          ))}

          {/* Drive Storage Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-indigo-500/20"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold">Secure Storage</p>
                <p className="text-xs text-white/80">Your documents are protected</p>
              </div>
            </div>
          </motion.div>

          {/* Drive Storage Section */}
          <div className="mt-6 px-2 pb-4">
            <h3 className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2">Drive</h3>
            <div className="h-px bg-slate-200 dark:bg-slate-700 mb-4 mx-2"></div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
              <div className="flex justify-between text-xs mb-2 font-medium">
                <span className="text-slate-700 dark:text-gray-300">Storage</span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  {storage.used < 1024 * 1024 * 1024
                    ? `${(storage.used / (1024 * 1024)).toFixed(0)} MB`
                    : `${(storage.used / (1024 * 1024 * 1024)).toFixed(1)} GB`} / 3 GB
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min((storage.used / storage.total) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-gray-400 font-medium">
                <span>Used: {storage.used < 1024 * 1024 * 1024
                  ? `${(storage.used / (1024 * 1024)).toFixed(1)} MB`
                  : `${(storage.used / (1024 * 1024 * 1024)).toFixed(1)} GB`}</span>
                <span>Left: {(storage.total - storage.used) < 1024 * 1024 * 1024
                  ? `${(Math.max(0, storage.total - storage.used) / (1024 * 1024)).toFixed(0)} MB`
                  : `${(Math.max(0, storage.total - storage.used) / (1024 * 1024 * 1024)).toFixed(2)} GB`}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
