import React from "react";
import { ArrowLeft } from "lucide-react";
import LogDetails from "./LogDetails";
import CommentSection from "./CommentSection";
import { motion, AnimatePresence } from "framer-motion";
import { DEFAULT_LOG_IMAGE } from "../../utils/constants";

const SingleObservationModal = ({ isOpen, onClose, log, onCommentAdded }) => {
  if (!log) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", duration: 0.5, bounce: 0.3 }} className="max-w-6xl w-full h-[80vh] flex bg-[#0F1428] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative z-10">
            <div className="w-[60%] relative h-full">
              <button onClick={onClose} className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 hover:bg-slate-900/80 text-white font-medium text-sm backdrop-blur-md transition-all border border-white/10 hover:border-white/20">
                <ArrowLeft size={16} />
                <span>Back to Dashboard</span>
              </button>

              <img
                src={log.image_url || DEFAULT_LOG_IMAGE}
                alt={log.title || log.target_object || "Observation"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DEFAULT_LOG_IMAGE;
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="w-[40%] flex flex-col h-full bg-[#151A30] p-6 overflow-y-auto custom-scrollbar">
              <LogDetails log={log} />
              <CommentSection log={log} onCommentAdded={onCommentAdded} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SingleObservationModal;
