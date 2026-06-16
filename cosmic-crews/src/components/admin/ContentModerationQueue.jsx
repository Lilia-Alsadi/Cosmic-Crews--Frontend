import React, { useState, useEffect } from "react";
import { Flag, AlertTriangle, Check, Trash2 } from "lucide-react";
import { adminService } from "../../api/adminService";
import { observationService } from "../../api/observationService";
import { DEFAULT_LOG_IMAGE } from "../../utils/constants";
import SingleObservationModal from "../posts/SingleObservationModal";

const FlaggedItemCard = ({ item, onDelete, onDismiss, onClick }) => {
  const isComment = item.item_type === "comment";

  return (
    <div onClick={() => onClick(item)} className="bg-[#070A14] border border-red-500/30 rounded-lg p-4 flex flex-col gap-3 cursor-pointer hover:border-red-500/50 transition-colors group">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-xs text-red-400 font-medium">Flagged by {item.flags_count || 1} users</p>
        </div>
        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm ${isComment ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"}`}>{isComment ? "Comment" : "Observation"}</span>
      </div>

      <div className="flex gap-3 bg-slate-900/40 p-3 rounded-md border border-slate-800">
        {!isComment && <img src={item.image_url || DEFAULT_LOG_IMAGE} alt="thumbnail" className="w-16 h-16 object-cover rounded border border-slate-700" />}
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-purple-400 mb-1">@{item.username || "Unknown"}</span>
          {isComment && <p className="text-[10px] text-slate-500 mb-1 line-clamp-1">On: {item.observation_title}</p>}
          <p className="text-sm text-slate-300 line-clamp-2">{item.content || item.title}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDismiss(item);
          }}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 transition-colors text-xs font-semibold"
        >
          <Check className="w-3.5 h-3.5" />
          Keep (Dismiss Flag)
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item);
          }}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white transition-colors text-xs font-semibold shadow-[0_0_10px_rgba(220,38,38,0.3)]"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete {isComment ? "Comment" : "Observation"}
        </button>
      </div>
    </div>
  );
};

const ContentModerationQueue = () => {
  const [flaggedItems, setFlaggedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    adminService.getFlaggedItems().then(setFlaggedItems).catch(console.error);
  }, []);

  const handleDelete = async (item) => {
    try {
      if (item.item_type === "comment") {
        await adminService.deleteComment(item.id);
      } else {
        await adminService.deleteLog(item.id);
      }
      setFlaggedItems((prev) => prev.filter((i) => !(i.id === item.id && i.item_type === item.item_type)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDismiss = async (item) => {
    try {
      if (item.item_type === "comment") {
        await adminService.dismissCommentFlag(item.id);
      } else {
        await adminService.dismissFlag(item.id);
      }
      setFlaggedItems((prev) => prev.filter((i) => !(i.id === item.id && i.item_type === item.item_type)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleItemClick = async (item) => {
    try {
      const targetId = item.item_type === "comment" ? item.observation_id : item.id;
      const log = await observationService.getObservation(targetId);
      setSelectedLog(log);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch observation:", err);
    }
  };

  return (
    <>
      <div className="bg-[#0F1428] border border-slate-800 rounded-xl p-6 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <Flag className="w-5 h-5 text-red-500" />
          <h2 className="text-xl font-bold text-white">Moderation Queue</h2>
        </div>

        <div className="overflow-y-auto custom-scrollbar gap-4 flex flex-col mt-4 pr-2 pb-4">{flaggedItems.length > 0 ? flaggedItems.map((item) => <FlaggedItemCard key={`${item.item_type}-${item.id}`} item={item} onDelete={handleDelete} onDismiss={handleDismiss} onClick={handleItemClick} />) : <div className="text-slate-500 text-center py-8">No flagged items to moderate.</div>}</div>
      </div>

      <SingleObservationModal isOpen={isModalOpen} log={selectedLog} onClose={() => setIsModalOpen(false)} onCommentAdded={() => {}} />
    </>
  );
};

export default ContentModerationQueue;
