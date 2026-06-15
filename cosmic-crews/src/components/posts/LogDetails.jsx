import React from 'react';
import { MoreHorizontal, Star, Share2 } from 'lucide-react';

const LogDetails = () => {
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="https://i.pravatar.cc/150?u=lunarlens" 
            alt="LunarLens" 
            className="w-10 h-10 rounded-full object-cover border border-slate-700"
          />
          <div className="flex flex-col">
            <span className="font-bold text-white text-sm">LunarLens</span>
            <span className="text-xs text-slate-500">3 hours ago</span>
          </div>
        </div>
        <button className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-full hover:bg-slate-800">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Metadata Badges */}
      <div className="flex flex-wrap gap-2">
        <div className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300">
          Target: Orion Nebula
        </div>
        <div className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300">
          Equipment: 10" Dobsonian
        </div>
        <div className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300">
          Bortle Class: 3
        </div>
      </div>

      {/* Caption */}
      <div className="text-slate-300 text-sm leading-relaxed">
        The Great Nebula in Orion was absolutely breathtaking tonight. The core trapezium cluster was razor sharp, and the nebulosity extended far beyond what I normally capture. Conditions were remarkably stable despite the light breeze. 
        <div className="mt-2">
          <span className="text-purple-400 hover:text-purple-300 cursor-pointer transition-colors mr-1">#Orion</span>
          <span className="text-purple-400 hover:text-purple-300 cursor-pointer transition-colors">#Nebula</span>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mt-2">
        <button className="flex items-center gap-2 group">
          <div className="p-2 rounded-full group-hover:bg-purple-500/10 transition-colors">
            <Star size={20} className="text-purple-500 group-hover:text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] transition-all" />
          </div>
          <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
            215 Stars
          </span>
        </button>

        <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
          <Share2 size={18} />
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>

    </div>
  );
};

export default LogDetails;
