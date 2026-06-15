const DirectoryHeader = ({ activeTab = 'Explore', onTabChange, onCreateClick }) => {
  const tabs = ['Explore', 'Joined Crews', 'Managed by Me'];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-lg">Constellation Crews</h1>
        <button onClick={onCreateClick} className="bg-purple-600 hover:bg-purple-500 text-white font-medium py-2 px-6 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300">
          + Create a Crew
        </button>
      </div>

      <div className="flex gap-8 border-b border-slate-800 mt-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange && onTabChange(tab)}
            className={`pb-3 font-medium transition-colors duration-200 ${
              activeTab === tab
                ? 'text-white border-b-2 border-purple-500 shadow-[0_4px_10px_-2px_rgba(168,85,247,0.4)]'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DirectoryHeader;
