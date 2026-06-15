import React from 'react';
import { Home, Compass, User, Settings, Plus } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-[#070a14] border-r border-white/5 flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 shadow-[0_0_15px_rgba(217,70,239,0.5)] border border-white/20" />
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
          Cosmic Crews
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4 flex flex-col gap-2">
        <a 
          href="#" 
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-900/40 text-white border-l-2 border-purple-400 shadow-[inset_2px_0_0_rgba(192,132,252,0.8)] transition-all"
        >
          <Home size={20} className="text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
          <span className="font-semibold tracking-wide">Home</span>
        </a>

        <a 
          href="#" 
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Compass size={20} />
          <span className="font-medium">Explore</span>
        </a>

        <a 
          href="#" 
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <User size={20} />
          <span className="font-medium">Profile</span>
        </a>

        <a 
          href="#" 
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </a>
      </nav>

      <div className="mx-6 border-b border-pink-500/30" />

      <div className="p-6 mt-auto">
        <button className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all transform hover:-translate-y-0.5">
          <Plus size={18} strokeWidth={3} />
          <span>New Log</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
