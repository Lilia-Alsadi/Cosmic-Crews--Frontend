import React from 'react';
import { Mail, Calendar, LogOut, Edit2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ProfileHeader = ({ onEditClick }) => {
  const { logout } = useAuth();

  return (
    <div className="bg-[#0F1428] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden mb-8">
      
      <div className="h-48 w-full relative">
        <img 
          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop" 
          alt="Space Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1428]/80 to-transparent"></div>
      </div>

      <div className="px-8 pb-8 relative">
        
        <div className="absolute -top-16 left-8">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" 
              alt="Lilia Alsadi Avatar" 
              className="w-32 h-32 rounded-full object-cover border-4 border-[#0F1428] shadow-xl"
            />
            <div className="absolute inset-0 rounded-full border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)] pointer-events-none"></div>
          </div>
        </div>

        <div className="h-20 w-full"></div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-wide">
                Lilia Alsadi
              </h1>
              <p className="text-purple-400 font-medium text-sm">
                @Lilia_Astro
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={onEditClick}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-900/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/50 transition-colors"
              >
                <Edit2 size={16} />
                <span className="text-sm font-semibold tracking-wide">Edit Profile</span>
              </button>
              
              <button 
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors"
              >
                <LogOut size={16} />
                <span className="text-sm font-semibold tracking-wide">Logout</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Mail size={16} />
              <span className="text-sm">lilia@example.com</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar size={16} />
              <span className="text-sm">Joined May 2026</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileHeader;
