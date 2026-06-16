import React, { useState } from "react";
import { Calendar, MapPin, Target, Users, Loader2 } from "lucide-react";
import { crewService } from "../../api/crewService";

const CreateEventForm = ({ crewId, onEventCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    start_time: "",
    end_time: "",
    max_attendees: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const eventData = { ...formData };
      if (!eventData.max_attendees || eventData.max_attendees == 0) {
        eventData.max_attendees = null;
      } else {
        eventData.max_attendees = parseInt(eventData.max_attendees);
      }

      const newEvent = await crewService.createEvent(crewId, eventData);
      setFormData({
        title: "",
        description: "",
        location: "",
        start_time: "",
        end_time: "",
        max_attendees: "",
      });
      alert("Event created successfully!");
      if (onEventCreated) onEventCreated(newEvent);
    } catch (err) {
      console.error(err);
      alert("Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0F1428]/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/20 rounded-lg">
          <Calendar className="w-5 h-5 text-emerald-400" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-wide">Create Viewing Party</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-400">Event Title</label>
            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Perseids Meteor Shower Watch" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors" />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-400">Description</label>
            <textarea rows="3" required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="What are we observing?" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"></textarea>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-400 flex items-center gap-1.5">
              <MapPin size={14} /> Location
            </label>
            <input type="text" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Observatory or coordinates" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-400 flex items-center gap-1.5">
              <Users size={14} /> Max Attendees (0 or empty = unlimited)
            </label>
            <input type="number" min="0" value={formData.max_attendees} onChange={(e) => setFormData({ ...formData, max_attendees: e.target.value })} placeholder="Unlimited" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-400">Start Time</label>
            <input type="datetime-local" required value={formData.start_time} onChange={(e) => setFormData({ ...formData, start_time: e.target.value })} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors cursor-pointer" style={{ colorScheme: "dark" }} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-400">End Time</label>
            <input type="datetime-local" required value={formData.end_time} onChange={(e) => setFormData({ ...formData, end_time: e.target.value })} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors cursor-pointer" style={{ colorScheme: "dark" }} />
          </div>
        </div>

        <div className="flex justify-end mt-2">
          <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]">
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
