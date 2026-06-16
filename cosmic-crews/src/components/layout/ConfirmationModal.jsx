import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, description, confirmText = "Confirm" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="w-full max-w-md bg-[#0F1428] border border-slate-800 rounded-2xl shadow-2xl relative z-10 p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-full text-red-400">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">{description}</p>

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-white transition-colors">
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-sm shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
