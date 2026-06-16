import React, { useState, useEffect } from "react";
import { X, Save, Camera, Image as ImageIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../api/authService";
import { DEFAULT_AVATAR } from "../../utils/constants";

const EditProfileModal = ({ isOpen, onClose }) => {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    bio: "",
    avatar_url: "",
    banner_url: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const data = await authService.uploadImage(file);
      setFormData((prev) => ({ ...prev, [field]: data.image_url }));
    } catch (err) {
      console.error(err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        username: user.username || "",
        bio: user.bio || "",
        avatar_url: user.avatar_url || "",
        banner_url: user.banner_url || "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const data = await authService.updateProfile({
        full_name: formData.full_name,
        username: formData.username,
        bio: formData.bio,
        avatar_url: formData.avatar_url,
        banner_url: formData.banner_url,
      });
      setUser(data.user || data);
      onClose();
    } catch (err) {
      console.error("Failed to update profile", err);
      alert(err.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", duration: 0.5, bounce: 0.3 }} className="w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col bg-[#0F1428] border border-slate-800 rounded-2xl shadow-2xl relative z-10">
            <div className="flex justify-between items-center p-6 border-b border-slate-800 shrink-0">
              <h2 className="text-xl font-bold text-white tracking-wide">Edit Profile & Settings</h2>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-800">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avatar</label>
                      <div onClick={() => document.getElementById("avatar-upload").click()} className={`flex items-center gap-6 cursor-pointer group p-2 rounded-2xl border-2 border-dashed ${isUploading ? "border-slate-700 opacity-50" : "border-slate-700 hover:border-purple-500"} bg-slate-900/30 transition-all`}>
                        <img src={formData.avatar_url || DEFAULT_AVATAR} alt="Avatar preview" className="w-20 h-20 rounded-full object-cover border-2 border-slate-700 group-hover:border-purple-500 transition-colors" />
                        <div className="flex-1 flex flex-col justify-center items-center gap-2 text-slate-400 group-hover:text-purple-400 transition-colors">
                          {isUploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Camera className="w-6 h-6" />}
                          <span className="text-sm font-medium">{isUploading ? "Uploading..." : "Click to change avatar"}</span>
                        </div>
                        <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={(e) => handleUpload(e, "avatar_url")} disabled={isUploading} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Banner Image</label>
                      <div onClick={() => document.getElementById("banner-upload").click()} className={`relative h-32 w-full rounded-xl border-2 border-dashed ${isUploading ? "border-slate-700 opacity-50" : "border-slate-700 hover:border-purple-500"} bg-slate-900/50 flex flex-col items-center justify-center cursor-pointer overflow-hidden group transition-colors`}>
                        {isUploading ? (
                          <div className="flex flex-col items-center gap-2 text-slate-400">
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span className="text-sm">Uploading...</span>
                          </div>
                        ) : formData.banner_url ? (
                          <>
                            <img src={formData.banner_url} alt="Banner preview" className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
                            <span className="text-xs font-medium text-white bg-black/60 px-3 py-1.5 rounded-lg absolute opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                              <ImageIcon className="w-4 h-4" /> Change Banner
                            </span>
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-slate-500 group-hover:text-purple-400 transition-colors">
                            <ImageIcon className="w-6 h-6" />
                            <span className="text-sm font-medium">Click to upload banner</span>
                          </div>
                        )}
                        <input type="file" id="banner-upload" className="hidden" accept="image/*" onChange={(e) => handleUpload(e, "banner_url")} disabled={isUploading} />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                    <input type="text" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Username</label>
                    <input type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bio</label>
                    <textarea rows="3" placeholder="Tell the universe about yourself..." value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none custom-scrollbar"></textarea>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-800 flex justify-end gap-4 shrink-0 bg-[#0F1428]">
              <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-white transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={isLoading || isUploading} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50">
                <Save size={16} />
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
