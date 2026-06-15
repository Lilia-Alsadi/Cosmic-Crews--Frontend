import React from 'react';
import { Hexagon } from 'lucide-react';

const SkyMilesWidget = () => {
  return (
    <div className="bg-[#0F1428] border border-slate-800 rounded-xl p-6 mt-6 shadow-xl relative overflow-hidden group">
      
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-600/10 transition-colors duration-500"></div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        <div className="flex items-center gap-5">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-xl bg-purple-900/30 border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            <Hexagon size={32} className="text-purple-400 fill-purple-500/20" />
            <div className="absolute inset-0 bg-purple-400/20 blur-md rounded-xl -z-10"></div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white tracking-wide">
              Deep Space Veteran
            </h2>
            <p className="text-sm font-medium text-purple-400">
              Level 4 Observer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8 md:gap-12 bg-slate-900/40 px-8 py-4 rounded-xl border border-slate-800/50">
          
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-white">42</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 mt-1">Total Logs</span>
          </div>

          <div className="w-px h-10 bg-slate-700/50"></div>

          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-white">890</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 mt-1">Stars Received</span>
          </div>

          <div className="w-px h-10 bg-slate-700/50"></div>

          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-white">3</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 mt-1">Crews Joined</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SkyMilesWidget;
