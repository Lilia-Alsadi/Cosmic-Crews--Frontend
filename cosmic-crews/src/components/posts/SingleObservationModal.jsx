import React from 'react';
import { ArrowLeft } from 'lucide-react';
import LogDetails from './LogDetails';
import CommentSection from './CommentSection';

const SingleObservationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      
      {/* Main Container */}
      <div className="max-w-6xl w-full h-[80vh] flex bg-[#0F1428] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
        
        {/* Left Pane (Media) */}
        <div className="w-[60%] relative h-full">
          {/* Back Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 hover:bg-slate-900/80 text-white font-medium text-sm backdrop-blur-md transition-all border border-white/10 hover:border-white/20"
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </button>

          {/* Placeholder Background Image */}
          <img 
            src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop" 
            alt="Orion Nebula Placeholder" 
            className="w-full h-full object-cover"
          />
          
          {/* Subtle gradient overlay to ensure the back button is always legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Right Pane (Content Shell) */}
        <div className="w-[40%] flex flex-col h-full bg-[#151A30] p-6 overflow-y-auto custom-scrollbar">
          <LogDetails />
          <CommentSection />
        </div>

      </div>
    </div>
  );
};

export default SingleObservationModal;
