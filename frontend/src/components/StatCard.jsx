const StatCard = ({ title, value, accent, icon }) => {
  const icons = {
    upload: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
    share: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z',
    login: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  };

  return (
    <div className="card p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-300 border-0 bg-white/80 dark:bg-[#141417] backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl ${accent} bg-opacity-10 dark:bg-opacity-20`}>
          <svg className={`w-6 h-6 ${accent.replace('bg-', 'text-').replace('-200', '-600')} dark:text-white`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[icon] || icons.upload} />
          </svg>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-slate-600 dark:text-gray-400">{title}</span>
        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">{value}</span>
      </div>
    </div>
  );
};

export default StatCard;

