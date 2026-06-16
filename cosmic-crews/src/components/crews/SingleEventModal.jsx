import React, { useState, useEffect } from "react";
import { X, Calendar, MapPin, Target, Users, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { crewService } from "../../api/crewService";
import { DEFAULT_AVATAR } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";

const SingleEventModal = ({ isOpen, onClose, event, onRsvpChanged }) => {
  const { user } = useAuth();
  const [attendees, setAttendees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRsvping, setIsRsvping] = useState(false);

  useEffect(() => {
    if (isOpen && event) {
      setIsLoading(true);
      crewService
        .getEventRsvps(event.id)
        .then(setAttendees)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, event]);

  if (!event) return null;

  const isAttending = attendees.some((a) => a.user_id === user?.id && a.status === "attending");
  const attendeeCount = attendees.filter((a) => a.status === "attending").length;
  const isFull = event.max_attendees && attendeeCount >= event.max_attendees;

  const handleRsvp = async () => {
    setIsRsvping(true);
    const newStatus = isAttending ? "not_attending" : "attending";
    try {
      await crewService.rsvpEvent(event.id, newStatus);
      const updatedAttendees = await crewService.getEventRsvps(event.id);
      setAttendees(updatedAttendees);
      if (onRsvpChanged) onRsvpChanged();
    } catch (err) {
      console.error(err);
      alert("Failed to update RSVP");
    } finally {
      setIsRsvping(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", duration: 0.5, bounce: 0.3 }} className="max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row bg-[#0F1428] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative z-10">
            <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
              <X size={20} />
            </button>

            <div className="w-full md:w-[60%] flex flex-col bg-[#0B1021] p-8 overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">Viewing Party</span>
              </div>

              <h2 className="text-3xl font-extrabold text-white mb-6 leading-tight">{event.title}</h2>

              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3 text-slate-300 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="font-medium text-sm text-slate-400">Start Time</div>
                    <div>{new Date(event.start_time).toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  <Clock className="w-5 h-5 text-slate-500" />
                  <div>
                    <div className="font-medium text-sm text-slate-400">End Time</div>
                    <div>{new Date(event.end_time).toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  <MapPin className="w-5 h-5 text-pink-400" />
                  <div>
                    <div className="font-medium text-sm text-slate-400">Location</div>
                    <div>{event.location}</div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">About this Event</h3>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-900/30 p-4 rounded-xl border border-slate-800/50">{event.description}</p>
              </div>
            </div>

            <div className="w-full md:w-[40%] flex flex-col bg-[#151A30] border-l border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-800 flex flex-col gap-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-400" />
                  Attendees
                </h3>

                <div className="flex items-center justify-between text-sm bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Spots</span>
                  <span className="font-bold text-white">
                    {attendeeCount} / {event.max_attendees || "Unlimited"}
                  </span>
                </div>

                <button onClick={handleRsvp} disabled={isRsvping || (!isAttending && isFull)} className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${isAttending ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20" : !isAttending && isFull ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]"}`}>
                  {isRsvping && <Loader2 className="w-4 h-4 animate-spin" />}
                  {!isRsvping && isAttending && <CheckCircle2 className="w-5 h-5" />}
                  {isAttending ? "You are going (Click to cancel)" : isFull ? "Event Full" : "RSVP Now"}
                </button>
              </div>

              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
                  </div>
                ) : attendees.filter((a) => a.status === "attending").length === 0 ? (
                  <div className="text-center text-slate-500 py-8">No one has RSVP'd yet. Be the first!</div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {attendees
                      .filter((a) => a.status === "attending")
                      .map((attendee) => (
                        <div key={attendee.user_id} className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl border border-slate-700/50">
                          <img src={attendee.avatar_url || DEFAULT_AVATAR} alt={attendee.username} className="w-10 h-10 rounded-full object-cover border border-slate-600" />
                          <span className="font-medium text-slate-200">@{attendee.username}</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SingleEventModal;
