import React from 'react';
import { Search, Key, Ban } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'AstroMark', avatar: 'https://i.pravatar.cc/150?u=astromark', email: 'mark@deepsky.net', role: 'Admin', status: 'Active' },
  { id: 2, name: 'LunarLens', avatar: 'https://i.pravatar.cc/150?u=lunarlens', email: 'lens@lunar.org', role: 'Observer', status: 'Active' },
  { id: 3, name: 'NovaChaser', avatar: 'https://i.pravatar.cc/150?u=novachaser', email: 'nova@chaser.io', role: 'Observer', status: 'Active' },
  { id: 4, name: 'StarSpammer', avatar: 'https://i.pravatar.cc/150?u=starspammer', email: 'spam@bot.com', role: 'Observer', status: 'Banned' },
];

const UserManagementTable = () => {
  return (
    <div className="bg-[#0F1428] border border-slate-800 rounded-xl p-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">User Directory</h2>
          <p className="text-sm text-slate-400 mt-1">Manage active accounts and permissions</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500" />
          </div>
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr>
              <th className="text-slate-400 text-sm font-medium border-b border-slate-800 pb-3 pl-2">User</th>
              <th className="text-slate-400 text-sm font-medium border-b border-slate-800 pb-3">Email</th>
              <th className="text-slate-400 text-sm font-medium border-b border-slate-800 pb-3">Role</th>
              <th className="text-slate-400 text-sm font-medium border-b border-slate-800 pb-3">Status</th>
              <th className="text-slate-400 text-sm font-medium border-b border-slate-800 pb-3 text-right pr-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                
                <td className="py-4 pl-2">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-slate-700 object-cover" />
                    <span className="font-semibold text-white">@{user.name}</span>
                  </div>
                </td>
                
                <td className="py-4 text-sm text-slate-300">
                  {user.email}
                </td>
                
                <td className="py-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                    user.role === 'Admin' 
                      ? 'bg-purple-900/30 text-purple-400 border-purple-500/30' 
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`}></span>
                    <span className={`text-sm font-medium ${user.status === 'Active' ? 'text-emerald-400' : 'text-red-400'}`}>{user.status}</span>
                  </div>
                </td>
                
                <td className="py-4 pr-2">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 bg-blue-900/20 text-blue-400 hover:bg-blue-900/40 hover:text-blue-300 rounded-md transition-colors" title="Reset Password">
                      <Key className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 bg-transparent border border-red-900/50 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-md transition-colors" title={user.status === 'Banned' ? 'Unban' : 'Suspend/Ban'}>
                      <Ban className="w-4 h-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default UserManagementTable;
