import React, { useState } from "react";
import { Camera, X, Calendar, Loader2 } from "lucide-react";
import BortleSlider from "./BortleSlider";
import { motion, AnimatePresence } from "framer-motion";
import { observationService } from "../../api/observationService";

const CreateObservationModal = ({ isOpen, onClose, onObservationCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    target_object: "",
    target_type: "",
    equipment_used: "",
    bortle_class: 3,
    content: "",
    observation_date: "",
    location: "",
    transparency: "",
    seeing: "",
    image_url: "",
  });
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [error, setError] = useState("");

  const doImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImg(true);
    setError("");
    try {
      const data = await observationService.uploadImage(file);
      setFormData((prev) => ({ ...prev, image_url: data.image_url }));
    } catch (e) {
      setError("Failed to upload image.");
      console.log("upload failed", e);
    } finally {
      setUploadingImg(false);
    }
  };

  const submitLog = async () => {
    if (!formData.title) {
      setError("Title is required");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await observationService.createObservation({
        ...formData,
        observation_date: formData.observation_date || null,
      });
      if (onObservationCreated) onObservationCreated();
      onClose();
    } catch (e) {
      setError("Failed to create log");
      console.log(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", duration: 0.5, bounce: 0.3 }} className="w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-[#0F1428] border border-slate-800 rounded-2xl p-6 shadow-2xl relative z-10">
            <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-white tracking-wide">New Observation Log</h2>
                {error && <span className="text-red-400 text-sm bg-red-900/20 px-3 py-1 rounded-lg">{error}</span>}
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-800">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Media Upload</h3>

                <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={doImageUpload} />
                <label htmlFor="image-upload" className="flex flex-col items-center justify-center gap-3 w-full h-48 border-2 border-dashed border-purple-500/50 hover:border-purple-400 bg-purple-900/10 hover:bg-purple-900/20 rounded-xl cursor-pointer transition-all group relative overflow-hidden">
                  {uploadingImg ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                      <p className="text-sm text-slate-300">Uploading...</p>
                    </div>
                  ) : formData.image_url ? (
                    <div className="absolute inset-0 w-full h-full group">
                      <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-sm font-medium">Click to change</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="p-3 bg-purple-500/20 rounded-full group-hover:scale-110 transition-transform">
                        <Camera size={28} className="text-purple-400" />
                      </div>
                      <p className="text-sm text-center text-slate-300 font-medium px-4">
                        Drag & drop astrophotography, or <span className="text-purple-400 group-hover:text-purple-300 transition-colors">click to upload</span>
                      </p>
                    </>
                  )}
                </label>
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Observation Details</h3>

                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 col-span-2">
                    <label className="text-sm text-slate-400">Observation Title</label>
                    <input type="text" placeholder="e.g. Great Red Spot visible tonight!" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-slate-400">Target Name</label>
                    <input
                      type="text"
                      placeholder="M31 Andromeda Galaxy"
                      value={formData.target_object}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          target_object: e.target.value,
                        })
                      }
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-slate-400">Equipment Used</label>
                    <input
                      type="text"
                      placeholder='8" Dobsonian'
                      value={formData.equipment_used}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          equipment_used: e.target.value,
                        })
                      }
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-slate-400">Target Type</label>
                    <select
                      value={formData.target_type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          target_type: e.target.value,
                        })
                      }
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none cursor-pointer"
                    >
                      <option className="bg-slate-900 text-slate-200" value="">
                        Select type
                      </option>
                      <option className="bg-slate-900 text-slate-200" value="Galaxy">
                        Galaxy
                      </option>
                      <option className="bg-slate-900 text-slate-200" value="Planet">
                        Planet
                      </option>
                      <option className="bg-slate-900 text-slate-200" value="Nebula">
                        Nebula
                      </option>
                      <option className="bg-slate-900 text-slate-200" value="Cluster">
                        Cluster
                      </option>
                      <option className="bg-slate-900 text-slate-200" value="Lunar">
                        Lunar
                      </option>
                      <option className="bg-slate-900 text-slate-200" value="Solar">
                        Solar
                      </option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-slate-400">Date/Time</label>
                    <input
                      type="datetime-local"
                      value={formData.observation_date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          observation_date: e.target.value,
                        })
                      }
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600 [color-scheme:dark]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 col-span-2">
                    <label className="text-sm text-slate-400">Location</label>
                    <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Dana Biosphere Reserve, Jordan" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-slate-400">Transparency</label>
                    <select
                      value={formData.transparency}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          transparency: e.target.value,
                        })
                      }
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none cursor-pointer"
                    >
                      <option className="bg-slate-900 text-slate-200" value="">
                        Select transparency
                      </option>
                      <option className="bg-slate-900 text-slate-200" value="Excellent">
                        Excellent
                      </option>
                      <option className="bg-slate-900 text-slate-200" value="Good">
                        Good
                      </option>
                      <option className="bg-slate-900 text-slate-200" value="Fair">
                        Fair
                      </option>
                      <option className="bg-slate-900 text-slate-200" value="Poor">
                        Poor
                      </option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-slate-400">Seeing</label>
                    <select value={formData.seeing} onChange={(e) => setFormData({ ...formData, seeing: e.target.value })} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none cursor-pointer">
                      <option className="bg-slate-900 text-slate-200" value="">
                        Select seeing
                      </option>
                      <option className="bg-slate-900 text-slate-200" value="Excellent">
                        Excellent
                      </option>
                      <option className="bg-slate-900 text-slate-200" value="Good">
                        Good
                      </option>
                      <option className="bg-slate-900 text-slate-200" value="Fair">
                        Fair
                      </option>
                      <option className="bg-slate-900 text-slate-200" value="Poor">
                        Poor
                      </option>
                    </select>
                  </div>

                  <BortleSlider value={formData.bortle_class} onChange={(val) => setFormData({ ...formData, bortle_class: val })} />
                </form>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Observation Notes (Free-form)</label>
                <textarea rows="4" placeholder="Spent 3 hours tracking. Core visible with naked eye. Dust lanes clear in the eyepiece..." value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600 resize-none custom-scrollbar"></textarea>
              </div>

              <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-800">
                <button onClick={submitLog} disabled={saving || uploadingImg} className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-medium transition-all duration-200 shadow-md shadow-purple-900/35 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Save Observation"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateObservationModal;
