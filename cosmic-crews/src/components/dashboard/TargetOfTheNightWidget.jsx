import React from 'react';
import { Target, Eye, Telescope } from 'lucide-react';

const TargetOfTheNightWidget = () => {
  return (
    <div className="bg-[#070a14]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Target size={18} className="text-purple-400" />
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Target of the Night
        </h3>
      </div>

      <div className="w-full h-40 rounded-xl overflow-hidden relative border border-white/5">
        <img 
          src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop" 
          alt="Jupiter & Galilean Moons" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070a14]/90 to-transparent" />
        
        <div className="absolute bottom-3 left-3 right-3">
          <h4 className="text-lg font-bold text-white leading-tight">
            Jupiter & Galilean Moons
          </h4>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <div className="p-1.5 rounded-md bg-blue-500/10 border border-blue-500/20">
            <Eye size={16} className="text-blue-400" />
          </div>
          <span>Visibility: Peak at 23:00</span>
        </div>
        
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <div className="p-1.5 rounded-md bg-purple-500/10 border border-purple-500/20">
            <Telescope size={16} className="text-purple-400" />
          </div>
          <span>Ideal Gear: Binoculars or Telescope</span>
        </div>
      </div>

      <button className="mt-2 w-full py-3 rounded-xl bg-purple-900/30 text-purple-200 font-semibold text-sm border border-purple-500/20 transition-all duration-300 hover:bg-purple-800/40 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(192,132,252,0.4)] hover:-translate-y-0.5">
        Log Observation
      </button>
    </div>
  );
};

export default TargetOfTheNightWidget;
