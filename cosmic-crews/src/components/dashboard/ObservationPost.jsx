import React from 'react';
import { Star, MessageCircle, Share2, Target, Telescope, MapPin, Flag } from 'lucide-react';

const ObservationPost = ({ onClick }) => {
  return (
    <article className="bg-[#0F1428] border border-slate-800 rounded-xl overflow-hidden shadow-xl w-full mb-6">
      
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="https://i.pravatar.cc/150?u=lunarlens" 
            alt="LunarLens" 
            className="w-10 h-10 rounded-full border border-white/20 object-cover"
          />
          <div>
            <h3 className="font-bold text-white text-sm hover:text-purple-400 cursor-pointer transition-colors">
              LunarLens
            </h3>
            <span className="text-xs text-gray-500">
              2h ago
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 flex flex-wrap gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/20 text-xs font-medium text-blue-300">
          <Target size={14} />
          Target: Jupiter
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/20 text-xs font-medium text-purple-300">
          <Telescope size={14} />
          Equipment: 10" Dobsonian
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-900/30 border border-pink-500/20 text-xs font-medium text-pink-300">
          <MapPin size={14} />
          Bortle: 3
        </div>
      </div>

      <div className="w-full h-64 bg-slate-800 relative cursor-pointer group" onClick={onClick}>
        <img 
          src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop" 
          alt="Observation of Jupiter" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-black/60 backdrop-blur-md text-white px-6 py-2 rounded-full font-medium border border-white/20">
            View Details
          </div>
        </div>
      </div>

      <div className="p-4 cursor-pointer" onClick={onClick}>
        <p className="text-gray-300 text-sm leading-relaxed">
          Great Red Spot was finally visible tonight! Conditions perfect. The atmospheric stability was unmatched compared to last week's session.
          <span className="text-purple-400 hover:underline ml-1">#Jupiter</span>
          <span className="text-purple-400 hover:underline ml-1">#Astrophotography</span>
        </p>
      </div>

      <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-white/5">
        <div className="flex items-center gap-6 mt-2">
          <button className="flex items-center gap-2 group">
            <div className="p-2 rounded-full group-hover:bg-amber-500/10 transition-colors">
              <Star size={20} className="text-gray-400 group-hover:text-amber-400 transition-colors" />
            </div>
            <span className="text-sm font-medium text-gray-400 group-hover:text-amber-400 transition-colors">
              124
            </span>
          </button>

          <button className="flex items-center gap-2 group" onClick={onClick}>
            <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
              <MessageCircle size={20} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
            </div>
            <span className="text-sm font-medium text-gray-400 group-hover:text-blue-400 transition-colors">
              18
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 mt-2 p-2 rounded-full hover:bg-red-500/10 transition-colors group" title="Report/Flag">
            <Flag size={20} className="text-gray-400 group-hover:text-red-400 transition-colors" />
          </button>
          <button className="flex items-center gap-2 mt-2 p-2 rounded-full hover:bg-white/5 transition-colors group" title="Share">
            <Share2 size={20} className="text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>

    </article>
  );
};

export default ObservationPost;
