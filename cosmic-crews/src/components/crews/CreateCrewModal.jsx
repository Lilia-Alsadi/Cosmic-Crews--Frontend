import React from 'react';
import { Star, Image as ImageIcon, Users, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CreateCrewModal = ({ isOpen, onClose }) => {
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
            className="w-full max-w-3xl bg-[#0F1428] border border-slate-800 rounded-2xl p-6 shadow-2xl relative z-10"
          >
        
            <div className="flex items-center gap-2 mb-8">
              <Star className="w-6 h-6 text-purple-400 fill-purple-400/20" />
              <h2 className="text-2xl font-bold text-white">Initialize a New Crew</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              
              <div className="md:col-span-1 flex flex-col">
                <label className="text-sm font-medium text-slate-400 mb-2">
                  Crew Emblem / Cover
                </label>
                <div className="aspect-square w-full border-2 border-dashed border-purple-500/50 hover:border-purple-400 bg-purple-900/10 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors duration-200">
                  <ImageIcon className="w-8 h-8 text-purple-400 mb-3" />
                  <span className="text-sm text-purple-300 font-medium">
                    Upload crew badge
                  </span>
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col gap-5">
                <div>
                  <label className="text-sm font-medium text-slate-400 mb-2 block">
                    Crew Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users className="h-5 w-5 text-slate-500" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="e.g., Deep Sky Navigators" 
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-400 mb-2 block">
                    Crew Description
                  </label>
                  <textarea 
                    rows="4"
                    placeholder="What is your crew focusing on? e.g., Astrophotography, Planetary observation..." 
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-400 mb-2 block">
                    Visibility
                  </label>
                  <select className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 px-3 text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors appearance-none cursor-pointer">
                    <option value="public">Public (Anyone can request to join)</option>
                    <option value="private">Private (Invite link only)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-4 border-t border-slate-800 pt-6">
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white font-medium transition-colors"
              >
                Cancel
              </button>
              <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-2.5 px-6 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all">
                <Rocket className="w-5 h-5" />
                <span>Launch Crew</span>
              </button>
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateCrewModal;
