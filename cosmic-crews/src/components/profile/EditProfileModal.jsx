import React, { useState } from 'react';
import { X, Camera, Save, User, Lock, Bell, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EditProfileModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');

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
            className="w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col bg-[#0F1428] border border-slate-800 rounded-2xl shadow-2xl relative z-10"
          >
            
            <div className="flex justify-between items-center p-6 border-b border-slate-800 shrink-0">
              <h2 className="text-xl font-bold text-white tracking-wide">
                Edit Profile & Settings
              </h2>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-800"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              
              <div className="w-48 bg-[#0a0d1a] border-r border-slate-800 p-4 flex flex-col gap-2 shrink-0">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-purple-900/40 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
                >
                  <User size={18} />
                  <span className="text-sm font-semibold">Profile Info</span>
                </button>
                <button 
                  onClick={() => setActiveTab('account')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'account' ? 'bg-purple-900/40 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
                >
                  <Lock size={18} />
                  <span className="text-sm font-semibold">Account</span>
                </button>
                <button 
                  onClick={() => setActiveTab('preferences')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'preferences' ? 'bg-purple-900/40 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
                >
                  <Bell size={18} />
                  <span className="text-sm font-semibold">Preferences</span>
                </button>
              </div>

              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                
                {activeTab === 'profile' && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avatar Image</label>
                      <div className="flex items-center gap-6">
                        <img 
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" 
                          alt="Avatar preview" 
                          className="w-20 h-20 rounded-full object-cover border-2 border-slate-700"
                        />
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-colors text-sm">
                          <Camera size={16} />
                          Change Avatar
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Display Name</label>
                      <input 
                        type="text" 
                        defaultValue="Lilia Alsadi" 
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Username</label>
                      <input 
                        type="text" 
                        defaultValue="Lilia_Astro" 
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bio</label>
                      <textarea 
                        rows="3"
                        placeholder="Tell the universe about yourself..."
                        defaultValue="Astrophotography enthusiast. Always looking up."
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none custom-scrollbar"
                      ></textarea>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'account' && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue="lilia@example.com" 
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">New Password</label>
                      <input 
                        type="password" 
                        placeholder="Leave blank to keep current password" 
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === 'preferences' && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
                    
                    <div className="flex items-center justify-between p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-slate-200">Cosmic Event Alerts</span>
                        <span className="text-xs text-slate-500">Receive emails for meteor showers & eclipses</span>
                      </div>
                      <div className="w-10 h-6 bg-purple-600 rounded-full flex items-center p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-4"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-slate-200">Public Profile</span>
                        <span className="text-xs text-slate-500">Allow other crews to see your observation logs</span>
                      </div>
                      <div className="w-10 h-6 bg-purple-600 rounded-full flex items-center p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-4"></div>
                      </div>
                    </div>

                  </motion.div>
                )}

              </div>
            </div>

            <div className="p-6 border-t border-slate-800 flex justify-end gap-4 shrink-0 bg-[#0F1428]">
              <button 
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all">
                <Save size={16} />
                Save Changes
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
