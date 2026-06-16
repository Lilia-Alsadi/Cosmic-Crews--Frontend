import React, { useState, useEffect } from "react";
import { X, Calendar, Edit2, Trash2, ShieldAlert } from "lucide-react";
import { adminService } from "../../api/adminService";
import { motion, AnimatePresence } from "framer-motion";

const AdminCrewEditModal = ({ isOpen, crew, onClose, onCrewUpdated }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [formData, setFormData] = useState({});
  const [events, setEvents] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [eventFormData, setEventFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (crew) {
      setFormData({
        name: crew.name || "",
        description: crew.description || "",
        location: crew.location || "",
        badge_url: crew.badge_url || "",
        owner_username: crew.owner_username || "",
      });
      fetchEvents();
      setErrorMsg("");
      setSuccessMsg("");
    }
  }, [crew]);

  const fetchEvents = () => {
    if (crew) {
      adminService.getCrewEvents(crew.id).then(setEvents).catch(console.error);
    }
  };

  const handleUpdateCrew = async () => {
    setIsSaving(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const updated = await adminService.updateCrew(crew.id, formData);
      onCrewUpdated(updated);
      setSuccessMsg("Crew updated successfully!");
      setIsSaving(false);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || err.message || "An error occurred while saving.");
      setIsSaving(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Delete this event completely?")) {
      try {
        await adminService.deleteEvent(eventId);
        setEvents((prev) => prev.filter((e) => e.id !== eventId));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const startEditEvent = (event) => {
    setEditingEventId(event.id);
    setEventFormData({
      title: event.title,
      description: event.description,
      location: event.location,
      start_time: event.start_time ? new Date(event.start_time).toISOString().slice(0, 16) : "",
      end_time: event.end_time ? new Date(event.end_time).toISOString().slice(0, 16) : "",
      max_attendees: event.max_attendees || "",
    });
  };

  const handleSaveEvent = async () => {
    try {
      const updated = await adminService.updateEvent(editingEventId, eventFormData);
      setEvents((prev) => prev.map((e) => (e.id === editingEventId ? { ...e, ...updated } : e)));
      setEditingEventId(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen || !crew) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="w-full max-w-3xl max-h-[90vh] bg-[#0F1428] border border-blue-500/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(59,130,246,0.15)] relative z-10 flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-white tracking-wide">Admin Edit: {crew.name}</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-800">
              <X size={24} />
            </button>
          </div>

          <div className="flex gap-4 mb-6 border-b border-slate-800">
            <button onClick={() => setActiveTab("details")} className={`pb-2 font-medium transition-colors ${activeTab === "details" ? "border-b-2 border-blue-500 text-blue-400" : "text-slate-400 hover:text-slate-200"}`}>
              Crew Details
            </button>
            <button onClick={() => setActiveTab("events")} className={`pb-2 font-medium transition-colors ${activeTab === "events" ? "border-b-2 border-blue-500 text-blue-400" : "text-slate-400 hover:text-slate-200"}`}>
              Crew Events
            </button>
          </div>

          <div className="overflow-y-auto custom-scrollbar flex-1 pr-2">
            {activeTab === "details" && (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-slate-400">Crew Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-slate-400">Owner Username</label>
                    <input
                      type="text"
                      value={formData.owner_username}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          owner_username: e.target.value,
                        })
                      }
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-slate-400">Description</label>
                  <textarea rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-slate-400">Location</label>
                    <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-slate-400">Badge URL</label>
                    <input type="text" value={formData.badge_url} onChange={(e) => setFormData({ ...formData, badge_url: e.target.value })} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div className="mt-4 flex flex-col items-end gap-2">
                  {errorMsg && <div className="text-red-400 text-sm font-medium bg-red-400/10 px-3 py-1.5 rounded">{errorMsg}</div>}
                  {successMsg && <div className="text-emerald-400 text-sm font-medium bg-emerald-400/10 px-3 py-1.5 rounded">{successMsg}</div>}
                  <button onClick={handleUpdateCrew} disabled={isSaving} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 mt-2">
                    {isSaving ? "Saving..." : "Force Save Crew"}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "events" && (
              <div className="flex flex-col gap-4">
                {events.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">This crew has no events.</p>
                ) : (
                  events.map((event) => (
                    <div key={event.id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 flex flex-col gap-3">
                      {editingEventId === event.id ? (
                        <div className="flex flex-col gap-3">
                          <input
                            type="text"
                            value={eventFormData.title}
                            onChange={(e) =>
                              setEventFormData({
                                ...eventFormData,
                                title: e.target.value,
                              })
                            }
                            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white"
                          />
                          <textarea
                            value={eventFormData.description}
                            onChange={(e) =>
                              setEventFormData({
                                ...eventFormData,
                                description: e.target.value,
                              })
                            }
                            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white"
                            rows="2"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="datetime-local"
                              value={eventFormData.start_time}
                              onChange={(e) =>
                                setEventFormData({
                                  ...eventFormData,
                                  start_time: e.target.value,
                                })
                              }
                              className="bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white [color-scheme:dark]"
                            />
                            <input
                              type="datetime-local"
                              value={eventFormData.end_time}
                              onChange={(e) =>
                                setEventFormData({
                                  ...eventFormData,
                                  end_time: e.target.value,
                                })
                              }
                              className="bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white [color-scheme:dark]"
                            />
                          </div>
                          <div className="flex justify-end gap-2 mt-2">
                            <button onClick={() => setEditingEventId(null)} className="px-3 py-1 text-xs font-semibold text-slate-400 hover:text-white">
                              Cancel
                            </button>
                            <button onClick={handleSaveEvent} className="px-3 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded">
                              Save Event
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-white text-base">{event.title}</h4>
                              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {new Date(event.start_time).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => startEditEvent(event)} className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDeleteEvent(event.id)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-slate-300 line-clamp-2">{event.description}</p>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminCrewEditModal;
