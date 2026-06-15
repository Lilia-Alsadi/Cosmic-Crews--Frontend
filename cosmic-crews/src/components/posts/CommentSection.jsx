import React from 'react';
import { Pencil, Trash2, Send } from 'lucide-react';

const CommentSection = () => {
  return (
    <div className="flex flex-col gap-6 mt-4 pb-8">
      
      {/* Input Area */}
      <div className="flex items-center gap-3 p-2 pl-4 rounded-full bg-slate-800/50 border border-slate-700 focus-within:border-purple-500/50 focus-within:bg-slate-800 transition-colors">
        <img 
          src="https://i.pravatar.cc/150?u=currentuser" 
          alt="Current User" 
          className="w-8 h-8 rounded-full object-cover"
        />
        <input 
          type="text" 
          placeholder="Add a comment..." 
          className="flex-1 bg-transparent border-none outline-none text-sm text-slate-200 placeholder:text-slate-500"
        />
        <button className="flex items-center justify-center p-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all">
          <Send size={16} className="ml-0.5" />
        </button>
      </div>

      {/* Comment List */}
      <div className="flex flex-col gap-5">
        
        {/* Standard Comment */}
        <div className="flex items-start gap-3">
          <img 
            src="https://i.pravatar.cc/150?u=astromark" 
            alt="AstroMark" 
            className="w-8 h-8 rounded-full object-cover mt-1"
          />
          <div className="flex flex-col">
            <span className="font-bold text-white text-sm">AstroMark</span>
            <p className="text-slate-300 text-sm mt-0.5 leading-relaxed">
              Incredible detail! Did you use any specific filters for this, or is this just stacked raw data?
            </p>
          </div>
        </div>

        {/* Owned Comment (With CRUD actions) */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <img 
              src="https://i.pravatar.cc/150?u=genericuser" 
              alt="Generic user" 
              className="w-8 h-8 rounded-full object-cover mt-1 border border-slate-700"
            />
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">Generic user</span>
                {/* CRUD Actions */}
                <button className="text-blue-400 hover:text-blue-300 transition-colors" title="Edit">
                  <Pencil size={14} />
                </button>
                <button className="text-red-400 hover:text-red-300 transition-colors" title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
              <p className="text-slate-300 text-sm mt-0.5 leading-relaxed">
                I was trying to capture it too but my tracking mount failed. This is inspiring, great work!
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CommentSection;
