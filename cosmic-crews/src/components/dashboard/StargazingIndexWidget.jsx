import React from 'react';
import { Cloud, Droplets, Moon } from 'lucide-react';

const StargazingIndexWidget = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#070a14]/60 backdrop-blur-xl border border-white/10 p-6 shadow-2xl">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <h2 className="text-xl font-bold text-white mb-6 relative z-10 flex items-center gap-2">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Stargazing Index
        </span>
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        <div className="flex items-center gap-6">
          <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-4 border-purple-900/50 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="56"
                fill="transparent"
                stroke="url(#purple-glow)"
                strokeWidth="6"
                strokeDasharray="351.8"
                strokeDashoffset="42.2" 
                className="drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
              />
              <defs>
                <linearGradient id="purple-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black text-white tracking-tighter shadow-purple-500/50 drop-shadow-md">
                88
              </span>
              <span className="text-xs text-purple-300 font-medium uppercase tracking-widest mt-1">
                / 100
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-300 bg-green-900/30 border border-green-500/30 rounded-full w-fit mb-2">
              Excellent Conditions
            </span>
            <p className="text-sm text-gray-400 max-w-[180px]">
              Atmospheric stability is high. Optimal viewing for deep-sky objects.
            </p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <div className="bg-[#0B1021]/80 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 transition-transform hover:scale-105">
            <Cloud className="text-blue-400 mb-1" size={24} />
            <span className="text-sm text-gray-400 font-medium">Cloud Cover</span>
            <span className="text-lg font-bold text-white">12%</span>
          </div>

          <div className="bg-[#0B1021]/80 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 transition-transform hover:scale-105">
            <Droplets className="text-cyan-400 mb-1" size={24} />
            <span className="text-sm text-gray-400 font-medium">Humidity</span>
            <span className="text-lg font-bold text-white">45%</span>
          </div>

          <div className="bg-[#0B1021]/80 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 transition-transform hover:scale-105">
            <Moon className="text-purple-400 mb-1" size={24} />
            <span className="text-sm text-gray-400 font-medium">Moon Phase</span>
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold text-white leading-tight">Waning Crescent</span>
              <span className="text-xs text-purple-300">(18% Illum)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StargazingIndexWidget;
