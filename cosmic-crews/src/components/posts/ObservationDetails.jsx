import React, { useState, useEffect } from "react";
import { MoreHorizontal, Star, Share2, Trash2 } from "lucide-react";
import { observationService } from "../../api/observationService";
import { adminService } from "../../api/adminService";
import { useAuth } from "../../context/AuthContext";
import { DEFAULT_AVATAR, DEFAULT_LOG_IMAGE } from "../../utils/constants";

const ObservationDetails = ({ log }) => {
  const [likesCount, setLikesCount] = useState(log?.likes_count || 0);
  const [hasLiked, setHasLiked] = useState(log?.has_liked || false);
  const [isLiking, setIsLiking] = useState(false);
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN" || user?.role === "PLATFORM_ADMIN" || user?.role === "admin";

  useEffect(() => {
    if (log) {
      setLikesCount(log.likes_count || 0);
      setHasLiked(log.has_liked || false);
    }
  }, [log]);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      const response = await observationService.likeObservation(log.id);
      if (response.liked) {
        setLikesCount((prev) => prev + 1);
        setHasLiked(true);
      } else {
        setLikesCount((prev) => Math.max(0, prev - 1));
        setHasLiked(false);
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleAdminDelete = async () => {
    if (window.confirm("Admin: Are you sure you want to permanently delete this observation?")) {
      try {
        await adminService.deleteLog(log.id);
        window.location.reload();
      } catch (err) {
        console.error("Failed to delete observation:", err);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={log.user?.avatar_url || DEFAULT_AVATAR} alt={log.user?.username || "User"} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
          <div className="flex flex-col">
            <span className="font-bold text-white text-sm">{log.user?.username || "Unknown"}</span>
            <span className="text-xs text-slate-500">{new Date(log.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <button onClick={handleAdminDelete} className="text-slate-500 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-red-500/10" title="Admin Delete">
              <Trash2 size={20} />
            </button>
          )}
          <button className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-full hover:bg-slate-800">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300">Target: {log.target_object || "Unknown"}</div>
        {log.target_type && <div className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300">Type: {log.target_type}</div>}
        <div className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300">Equipment: {log.equipment_used || "Unknown"}</div>
        {log.location && <div className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300">{log.location}</div>}
        {log.bortle_class && <div className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300">Bortle Class: {log.bortle_class}</div>}
        {log.seeing && <div className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300">Seeing: {log.seeing}</div>}
        {log.transparency && <div className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300">Transp: {log.transparency}</div>}
        {log.observation_date && <div className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300">Observed: {new Date(log.observation_date).toLocaleString()}</div>}
      </div>

      <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap break-words">{log.content || log.title}</div>

      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mt-2">
        <button className="flex items-center gap-2 group" onClick={handleLike} disabled={isLiking}>
          <div className={`p-2 rounded-full transition-colors ${hasLiked ? "bg-red-500/20" : "group-hover:bg-red-500/10"}`}>
            <Star size={20} className={`transition-all ${hasLiked ? "text-red-500 fill-current drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" : "text-slate-400 group-hover:text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]"}`} />
          </div>
          <span className={`text-sm font-semibold transition-colors ${hasLiked ? "text-red-500" : "text-slate-300 group-hover:text-red-400"}`}>{likesCount} Stars</span>
        </button>
      </div>
    </div>
  );
};

export default ObservationDetails;
