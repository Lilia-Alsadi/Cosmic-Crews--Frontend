import React from 'react';
import { Camera, X, Calendar } from 'lucide-react';
import BortleSlider from './BortleSlider';
import { motion, AnimatePresence } from 'framer-motion';

const CreateLogModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-[#0F1428] border border-slate-800 rounded-2xl p-6 shadow-2xl relative z-10"
          >
        
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-white tracking-wide">
            New Observation Log
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-800"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="col-span-1 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Media Upload
            </h3>
            
            <div className="flex flex-col items-center justify-center gap-3 w-full h-48 border-2 border-dashed border-purple-500/50 hover:border-purple-400 bg-purple-900/10 hover:bg-purple-900/20 rounded-xl cursor-pointer transition-all group">
              <div className="p-3 bg-purple-500/20 rounded-full group-hover:scale-110 transition-transform">
                <Camera size={28} className="text-purple-400" />
              </div>
              <p className="text-sm text-center text-slate-300 font-medium px-4">
                Drag & drop astrophotography, or <span className="text-purple-400 group-hover:text-purple-300 transition-colors">click to upload</span>
              </p>
            </div>

            <div className="mt-2 flex flex-wrap gap-3">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-700 group">
                <img 
                  src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=300&auto=format&fit=crop" 
                  alt="Thumbnail Preview" 
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-red-500/80 text-white rounded-full backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100">
                  <X size={12} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Observation Details
            </h3>
            
            <form className="grid grid-cols-2 gap-4">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-slate-400">Target Name</label>
                <input 
                  type="text" 
                  placeholder="M31 Andromeda Galaxy" 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-slate-400">Equipment Used</label>
                <select className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none cursor-pointer">
                  <option className="bg-slate-900 text-slate-200" value="" disabled selected>8" Dobsonian + 10mm Eyepiece</option>
                  <option className="bg-slate-900 text-slate-200">8" Dobsonian + 10mm Eyepiece</option>
                  <option className="bg-slate-900 text-slate-200">Celestron NexStar 8SE</option>
                  <option className="bg-slate-900 text-slate-200">Sky-Watcher Star Adventurer + DSLR</option>
                  <option className="bg-slate-900 text-slate-200">Naked Eye / Binoculars</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-slate-400">Target Type</label>
                <select className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none cursor-pointer">
                  <option className="bg-slate-900 text-slate-200" value="" disabled selected>Select type</option>
                  <option className="bg-slate-900 text-slate-200">Galaxy</option>
                  <option className="bg-slate-900 text-slate-200">Planet</option>
                  <option className="bg-slate-900 text-slate-200">Nebula</option>
                  <option className="bg-slate-900 text-slate-200">Cluster</option>
                  <option className="bg-slate-900 text-slate-200">Lunar</option>
                  <option className="bg-slate-900 text-slate-200">Solar</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-sm text-slate-400">Date/Time</label>
                <input 
                  type="text" 
                  placeholder="2026-10-21 21:30" 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-4 pr-10 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600"
                />
                <Calendar className="absolute right-3 top-[34px] text-slate-500 pointer-events-none" size={16} />
              </div>

              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-sm text-slate-400">Location</label>
                <input 
                  type="text" 
                  placeholder="Dana Biosphere Reserve, Jordan" 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-slate-400">Transparency</label>
                <select className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none cursor-pointer">
                  <option className="bg-slate-900 text-slate-200" value="" disabled selected>Excellent</option>
                  <option className="bg-slate-900 text-slate-200">Excellent</option>
                  <option className="bg-slate-900 text-slate-200">Good</option>
                  <option className="bg-slate-900 text-slate-200">Fair</option>
                  <option className="bg-slate-900 text-slate-200">Poor</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-slate-400">Seeing</label>
                <select className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none cursor-pointer">
                  <option className="bg-slate-900 text-slate-200" value="" disabled selected>Good</option>
                  <option className="bg-slate-900 text-slate-200">Excellent</option>
                  <option className="bg-slate-900 text-slate-200">Good</option>
                  <option className="bg-slate-900 text-slate-200">Fair</option>
                  <option className="bg-slate-900 text-slate-200">Poor</option>
                </select>
              </div>

              <BortleSlider />

            </form>
          </div>

        </div>
        
        <div className="mt-8 flex flex-col gap-6">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Observation Notes (Free-form)
            </label>
            <textarea 
              rows="4"
              placeholder="Spent 3 hours tracking. Core visible with naked eye. Dust lanes clear in the eyepiece..."
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600 resize-none custom-scrollbar"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-800">
            <button className="text-sm font-bold text-white px-8 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-all transform hover:-translate-y-0.5">
              Save Observation
            </button>
          </div>

        </div>

        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateLogModal;
