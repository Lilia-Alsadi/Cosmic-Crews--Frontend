import React from 'react';
import { UserPlus, Check, X, Users, Trash2 } from 'lucide-react';

const pendingRequests = [
  { id: 1, name: 'Astro_Amir', time: 'Requested 2h ago', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop' },
  { id: 2, name: 'Stellar_Sarah', time: 'Requested 5h ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop' },
];

const roster = [
  { id: 1, name: 'Cosmic_Chris', role: 'Owner', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop' },
  { id: 2, name: 'Nebula_Nina', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop' },
  { id: 3, name: 'Luna_Luke', role: 'Member', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop' },
];

const ManageCrewPanel = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      
      <div className="bg-[#0F1428]/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <UserPlus className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">Pending Membership Requests</h2>
          <span className="ml-auto bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {pendingRequests.length}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {pendingRequests.map(req => (
            <div key={req.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:bg-slate-900/60 transition-colors">
              <div className="flex items-center gap-4">
                <img src={req.avatar} alt={req.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                <div>
                  <p className="text-white font-medium">{req.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{req.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors text-sm font-medium">
                  <Check className="w-4 h-4" />
                  Accept
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 transition-colors text-sm font-medium">
                  <X className="w-4 h-4" />
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0F1428]/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Users className="w-5 h-5 text-indigo-400" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">Crew Roster</h2>
        </div>

        <div className="flex flex-col gap-3">
          {roster.map(member => (
            <div key={member.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/30 transition-colors border border-transparent hover:border-slate-800/50">
              <div className="flex items-center gap-4">
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                <p className="text-slate-200 font-medium">{member.name}</p>
              </div>
              <div className="flex items-center gap-4">
                {member.role === 'Owner' && (
                  <span className="bg-purple-900/60 text-purple-300 border border-purple-500/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                    Owner
                  </span>
                )}
                {member.role === 'Admin' && (
                  <span className="bg-indigo-900/40 text-indigo-300 border border-indigo-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Admin
                  </span>
                )}
                {member.role === 'Member' && (
                  <span className="bg-transparent text-slate-400 border border-slate-600/50 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Member
                  </span>
                )}

                {member.role !== 'Owner' ? (
                  <button className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Remove Member">
                    <Trash2 className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="w-8"></div> /* Spacer to keep alignment clean */
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ManageCrewPanel;
