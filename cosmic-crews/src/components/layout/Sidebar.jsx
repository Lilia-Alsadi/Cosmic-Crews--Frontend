import React from 'react';
import { Home, Users, User, PlusCircle, BookOpen, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ onNewLogClick }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { user } = useAuth();

  const isActive = (path) => {
    if (path === '/dashboard') return pathname === '/dashboard' || pathname === '/';
    if (path === '/crews') return pathname === '/crews' || pathname.startsWith('/crew/');
    if (path === '/admin') return pathname === '/admin';
    return pathname === path;
  };

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-[#070a14] border-r border-white/5 flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 shadow-[0_0_15px_rgba(217,70,239,0.5)] border border-white/20" />
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
          Cosmic Crews
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4 flex flex-col gap-2">
        <Link 
          to="/dashboard" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/dashboard') ? 'bg-purple-900/40 text-white border-l-2 border-purple-400 shadow-[inset_2px_0_0_rgba(192,132,252,0.8)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <Home size={20} className={isActive('/dashboard') ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]' : ''} />
          <span className={isActive('/dashboard') ? 'font-semibold tracking-wide' : 'font-medium'}>Home</span>
        </Link>

        <Link 
          to="/crews" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/crews') ? 'bg-purple-900/40 text-white border-l-2 border-purple-400 shadow-[inset_2px_0_0_rgba(192,132,252,0.8)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <Users size={20} className={isActive('/crews') ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]' : ''} />
          <span className={isActive('/crews') ? 'font-semibold tracking-wide' : 'font-medium'}>Crews</span>
        </Link>

        <Link 
          to="/logs" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/logs') ? 'bg-purple-900/40 text-white border-l-2 border-purple-400 shadow-[inset_2px_0_0_rgba(192,132,252,0.8)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <BookOpen size={20} className={isActive('/logs') ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]' : ''} />
          <span className={isActive('/logs') ? 'font-semibold tracking-wide' : 'font-medium'}>Logs</span>
        </Link>

        <Link 
          to="/profile" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/profile') ? 'bg-purple-900/40 text-white border-l-2 border-purple-400 shadow-[inset_2px_0_0_rgba(192,132,252,0.8)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <User size={20} className={isActive('/profile') ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]' : ''} />
          <span className={isActive('/profile') ? 'font-semibold tracking-wide' : 'font-medium'}>Profile</span>
        </Link>
        
        {user?.role === 'ADMIN' && (
          <>
            <div className="mt-4 mb-2 px-4">
              <div className="h-px w-full bg-slate-800"></div>
            </div>
            <Link 
              to="/admin" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin') ? 'bg-purple-900/40 text-white border-l-2 border-purple-400 shadow-[inset_2px_0_0_rgba(192,132,252,0.8)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Shield size={20} className={isActive('/admin') ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]' : ''} />
              <span className={isActive('/admin') ? 'font-semibold tracking-wide' : 'font-medium'}>Admin</span>
            </Link>
          </>
        )}
      </nav>

      <div className="p-6 mt-auto">
        <button 
          onClick={onNewLogClick}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all transform hover:-translate-y-0.5"
        >
          <PlusCircle size={18} strokeWidth={3} />
          <span>New Log</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
