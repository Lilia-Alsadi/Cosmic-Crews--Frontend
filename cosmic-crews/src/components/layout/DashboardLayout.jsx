import React from 'react';
import { 
  LayoutDashboard, 
  Telescope, 
  Users, 
  User, 
  Settings, 
  LogOut 
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-[#0B1021] text-white overflow-hidden">
      
      <aside className="w-64 h-screen bg-[#070a14]/80 backdrop-blur-md border-r border-white/5 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Cosmic Crews
          </h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white transition-colors">
            <LayoutDashboard size={20} className="text-blue-400" />
            <span className="font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <Telescope size={20} />
            <span className="font-medium">Observatory Feed</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <Users size={20} />
            <span className="font-medium">Constellation Crews</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <User size={20} />
            <span className="font-medium">Profile</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </a>
        </nav>

        <div className="p-4 mt-auto">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto p-8 bg-[#0B1021]">
        <div className="w-full h-full border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center">
          {children || (
            <p className="text-gray-500 font-medium">Dashboard Widgets Go Here</p>
          )}
        </div>
      </main>

    </div>
  );
};

export default DashboardLayout;
