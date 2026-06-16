import React, { useState } from "react";
import { Star, Image as ImageIcon, Users, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { crewService } from "../../api/crewService";
import { useNavigate } from "react-router-dom";

const CreateCrewModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    badge_url: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setError("Crew name is required");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const newCrew = await crewService.createCrew({
        name: formData.name,
        description: formData.description,
        location: "Global",
        badge_url: formData.badge_url,
      });
      setFormData({ name: "", description: "", badge_url: "" });
      alert("Congrats! You made a crew 🎉");
      onClose();
      navigate(`/crew/${newCrew.id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create crew");
    } finally {
      setIsLoading(false);
    }
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("image", file);

    setIsLoading(true);
    try {
      const res = await crewService.uploadImage(uploadData);
      setFormData((prev) => ({ ...prev, badge_url: res.image_url }));
    } catch (err) {
      setError("Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", duration: 0.5, bounce: 0.3 }} className="w-full max-w-3xl bg-[#0F1428] border border-slate-800 rounded-2xl p-6 shadow-2xl relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-purple-400 fill-purple-400/20" />
                <h2 className="text-2xl font-bold text-white">Initialize a New Crew</h2>
              </div>
              {error && <div className="text-red-400 text-sm font-medium bg-red-900/20 px-3 py-1 rounded-lg">{error}</div>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-1 flex flex-col">
                <label className="text-sm font-medium text-slate-400 mb-2">Crew Emblem / Cover</label>
                <div className="relative aspect-square w-full border-2 border-dashed border-purple-500/50 hover:border-purple-400 bg-purple-900/10 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 overflow-hidden group" onClick={() => document.getElementById("crew-image-upload").click()}>
                  {formData.badge_url ? (
                    <img src={formData.badge_url} alt="Crew Emblem" className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 text-purple-400 mb-3" />
                      <span className="text-sm text-purple-300 font-medium text-center px-4">Upload crew badge</span>
                    </>
                  )}
                  <input type="file" id="crew-image-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col gap-5">
                <div>
                  <label className="text-sm font-medium text-slate-400 mb-2 block">Crew Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users className="h-5 w-5 text-slate-500" />
                    </div>
                    <input type="text" placeholder="e.g., Deep Sky Navigators" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-400 mb-2 block">Crew Description</label>
                  <textarea rows="4" placeholder="What is your crew focusing on? e.g., Astrophotography, Planetary observation..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-4 border-t border-slate-800 pt-6">
              <button onClick={onClose} className="text-slate-400 hover:text-white font-medium transition-colors">
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={isLoading} className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-2.5 px-6 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all disabled:opacity-50">
                <Rocket className="w-5 h-5" />
                <span>{isLoading ? "Launching..." : "Launch Crew"}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateCrewModal;
