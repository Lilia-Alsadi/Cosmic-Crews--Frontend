import React, { useState, useEffect } from "react";
import { Star, MessageCircle, Target, Telescope, MapPin, Flag, Trash2 } from "lucide-react";
import ConfirmationModal from "../layout/ConfirmationModal";
import { logService } from "../../api/logService";
import { adminService } from "../../api/adminService";
import { useAuth } from "../../context/AuthContext";
import { DEFAULT_AVATAR, DEFAULT_LOG_IMAGE } from "../../utils/constants";

const ObservationPost = ({ log, onClick }) => {
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [isFlagging, setIsFlagging] = useState(false);
  const [likesCount, setLikesCount] = useState(log?.likes_count || 0);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(log?.has_liked || false);
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN" || user?.role === "PLATFORM_ADMIN" || user?.role === "admin";

  useEffect(() => {
    if (log) {
      setLikesCount(log.likes_count || 0);
      setHasLiked(log.has_liked || false);
    }
  }, [log]);

  if (!log) return null;

  const handleFlag = async () => {
    setIsFlagging(true);
    try {
      await logService.flagLog(log.id);
      alert("Observation flagged for review.");
    } catch (err) {
      console.error("Error flagging observation:", err);
      alert("Failed to flag observation.");
    } finally {
      setIsFlagging(false);
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    if (isLiking) return;
    setIsLiking(true);
    try {
      const response = await logService.likeLog(log.id);
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

  const handleAdminDelete = async (e) => {
    e.stopPropagation();
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
    <article className="bg-[#0F1428] border border-slate-800 rounded-xl overflow-hidden shadow-xl w-full mb-6">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={log.user?.avatar_url || DEFAULT_AVATAR} alt={log.user?.username} className="w-10 h-10 rounded-full border border-white/20 object-cover" />
          <div>
            <h3 className="font-bold text-white text-sm hover:text-purple-400 cursor-pointer transition-colors">{log.user?.username}</h3>
            <span className="text-xs text-gray-500">{log.created_at ? new Date(log.created_at).toLocaleDateString() : "recently"}</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 flex flex-wrap gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/20 text-xs font-medium text-blue-300">
          <Target size={14} />
          Target: {log.target_object}
        </div>
        {log.target_type && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/20 text-xs font-medium text-blue-300">
            <Target size={14} />
            Type: {log.target_type}
          </div>
        )}
        {log.equipment_used && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/20 text-xs font-medium text-purple-300">
            <Telescope size={14} />
            Equipment: {log.equipment_used}
          </div>
        )}
        {log.location && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-900/30 border border-pink-500/20 text-xs font-medium text-pink-300">
            <MapPin size={14} />
            {log.location}
          </div>
        )}
        {log.bortle_class && <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-900/30 border border-orange-500/20 text-xs font-medium text-orange-300">Bortle: {log.bortle_class}</div>}
        {log.seeing && <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-900/30 border border-green-500/20 text-xs font-medium text-green-300">Seeing: {log.seeing}</div>}
        {log.transparency && <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-900/30 border border-cyan-500/20 text-xs font-medium text-cyan-300">Transp: {log.transparency}</div>}
      </div>

      <div className="w-full h-64 bg-slate-800 relative cursor-pointer group" onClick={onClick}>
        <img
          src={log.image_url || DEFAULT_LOG_IMAGE}
          alt={`Observation of ${log.target_object}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = DEFAULT_LOG_IMAGE;
          }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-black/60 backdrop-blur-md text-white px-6 py-2 rounded-full font-medium border border-white/20">View Details</div>
        </div>
      </div>

      <div className="p-4 cursor-pointer" onClick={onClick}>
        <h4 className="text-white font-bold mb-1">{log.title}</h4>
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">{log.content}</p>
      </div>

      <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-white/5">
        <div className="flex items-center gap-6 mt-2">
          <button className="flex items-center gap-2 group" onClick={handleLike} disabled={isLiking}>
            <div className={`p-2 rounded-full transition-colors ${hasLiked ? "bg-red-500/20" : "group-hover:bg-red-500/10"}`}>
              <Star size={20} className={`transition-colors ${hasLiked ? "text-red-500 fill-current" : "text-gray-400 group-hover:text-red-400"}`} />
            </div>
            <span className={`text-sm font-medium transition-colors ${hasLiked ? "text-red-500" : "text-gray-400 group-hover:text-red-400"}`}>{likesCount}</span>
          </button>

          <button className="flex items-center gap-2 group" onClick={onClick}>
            <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
              <MessageCircle size={20} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
            </div>
            <span className="text-sm font-medium text-gray-400 group-hover:text-blue-400 transition-colors">{log.comments_count || 0}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <button onClick={handleAdminDelete} className="flex items-center gap-2 mt-2 p-2 rounded-full hover:bg-red-500/10 transition-colors group" title="Admin Delete">
              <Trash2 size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFlagModalOpen(true);
            }}
            className="flex items-center gap-2 mt-2 p-2 rounded-full hover:bg-red-500/10 transition-colors group"
            title="Report/Flag"
          >
            <Flag size={20} className="text-gray-400 group-hover:text-red-400 transition-colors" />
          </button>
        </div>
      </div>

      <ConfirmationModal isOpen={isFlagModalOpen} onClose={() => setIsFlagModalOpen(false)} onConfirm={handleFlag} title="Report Observation" description="Are you sure you want to report this observation? This action will notify the platform moderators to review the content." confirmText={isFlagging ? "Reporting..." : "Report"} />
    </article>
  );
};

export default ObservationPost;
