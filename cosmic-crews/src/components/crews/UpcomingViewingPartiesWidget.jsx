import React from "react";
import { Calendar, MapPin, Target, CheckCircle2 } from "lucide-react";

const events = [
  {
    id: 1,
    month: "JUN",
    day: "21",
    title: "Summer Solstice Gathering",
    target: "Milky Way Core",
    location: "Dana Reserve",
    isRsvpd: true,
  },
  {
    id: 2,
    month: "JUL",
    day: "14",
    title: "Supermoon Watch Party",
    target: "Lunar Craters",
    location: "Wadi Rum Observatory",
    isRsvpd: false,
  },
  {
    id: 3,
    month: "AUG",
    day: "12",
    title: "Perseids Meteor Shower",
    target: "Perseus Constellation",
    location: "Azraq Wetland",
    isRsvpd: false,
  },
];

const UpcomingViewingPartiesWidget = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-bold text-white tracking-wide">Group Viewing Parties</h3>
        </div>
        <button className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">+ Schedule Event</button>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 pb-20">
        {events.map((event) => (
          <div key={event.id} className="flex flex-col p-4 bg-[#0F1428]/80 backdrop-blur-md border border-slate-800 rounded-xl hover:border-slate-700 transition-colors shadow-lg">
            <div className="flex gap-4">
              <div className="w-14 h-16 shrink-0 bg-slate-900 rounded-lg border border-slate-700 flex flex-col items-center justify-center shadow-inner">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{event.month}</span>
                <span className="text-xl font-extrabold text-white leading-none mt-1">{event.day}</span>
              </div>

              <div className="flex flex-col justify-center">
                <h4 className="text-base font-bold text-white leading-tight">{event.title}</h4>
                <div className="flex items-center gap-1.5 mt-2">
                  <Target className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs text-slate-300 font-medium">Target: {event.target}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs text-slate-400">{event.location}</span>
                </div>
              </div>
            </div>

            <button className={`mt-4 w-full py-2 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${event.isRsvpd ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]"}`}>
              {event.isRsvpd && <CheckCircle2 className="w-4 h-4" />}
              {event.isRsvpd ? "Going" : "RSVP / Join Event"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingViewingPartiesWidget;
