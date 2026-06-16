import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Send, Flag } from "lucide-react";
import { logService } from "../../api/logService";
import { adminService } from "../../api/adminService";
import { useAuth } from "../../context/AuthContext";
import { DEFAULT_AVATAR } from "../../utils/constants";

const CommentSection = ({ log, onCommentAdded }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isAdmin = user?.role === "ADMIN" || user?.role === "PLATFORM_ADMIN" || user?.role === "admin";

  useEffect(() => {
    const fetchComments = async () => {
      if (!log?.id) return;
      setIsLoading(true);
      try {
        const data = await logService.getComments(log.id);
        setComments(data);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [log?.id]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !log) return;
    setIsSubmitting(true);
    try {
      const addedComment = await logService.addComment(log.id, {
        content: newComment,
      });
      const commentWithUser = {
        ...addedComment,
        user: { username: user?.username, avatar_url: user?.avatar_url },
      };
      setComments((prev) => [...prev, commentWithUser]);
      setNewComment("");
      if (onCommentAdded) {
        onCommentAdded(log.id);
      }
    } catch (err) {
      console.error("Failed to add comment", err);
      alert("Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFlagComment = async (commentId) => {
    try {
      await logService.flagComment(commentId);
      alert("Comment flagged for review.");
    } catch (err) {
      console.error("Failed to flag comment", err);
      alert("Failed to flag comment.");
    }
  };

  const handleAdminDeleteComment = async (commentId) => {
    if (window.confirm("Admin: Are you sure you want to delete this comment?")) {
      try {
        await adminService.deleteComment(commentId);
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      } catch (err) {
        console.error("Failed to delete comment:", err);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-4 pb-8">
      <div className="flex items-center gap-3 p-2 pl-4 rounded-full bg-slate-800/50 border border-slate-700 focus-within:border-purple-500/50 focus-within:bg-slate-800 transition-colors">
        <img src={user?.avatar_url || DEFAULT_AVATAR} alt="Your avatar" className="w-8 h-8 rounded-full border border-slate-700 object-cover" />
        <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddComment()} placeholder="Add a comment..." className="flex-1 bg-transparent border-none outline-none text-sm text-slate-200 placeholder:text-slate-500" />
        <button onClick={handleAddComment} disabled={isSubmitting || !newComment.trim()} className="flex items-center justify-center p-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all disabled:opacity-50">
          <Send size={16} className="ml-0.5" />
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {isLoading ? (
          <div className="text-slate-500 text-sm text-center py-4 animate-pulse">Loading comments...</div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3">
              <img src={comment.user?.avatar_url || DEFAULT_AVATAR} alt={comment.user?.username} className="w-8 h-8 rounded-full border border-slate-700 object-cover mt-1" />
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-white text-sm">{comment.user?.username || "Unknown"}</span>
                  <div className="flex items-center gap-2">
                    {isAdmin && (
                      <button className="text-slate-500 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-500/10" title="Admin Delete" onClick={() => handleAdminDeleteComment(comment.id)}>
                        <Trash2 size={14} />
                      </button>
                    )}
                    <button className="text-slate-500 hover:text-red-400 transition-colors p-1 rounded hover:bg-red-400/10" title="Flag Comment" onClick={() => handleFlagComment(comment.id)}>
                      <Flag size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mt-0.5 leading-relaxed">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-slate-500 text-sm text-center py-4">No comments yet. Be the first to share your thoughts!</div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
