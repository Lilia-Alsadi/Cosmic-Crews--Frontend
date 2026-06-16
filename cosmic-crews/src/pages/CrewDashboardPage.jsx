import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { MapPin, LogOut } from "lucide-react";
import ManageCrewPanel from "../components/crews/ManageCrewPanel";
import CrewNavigatorsWidget from "../components/crews/CrewNavigatorsWidget";
import ObservationPost from "../components/dashboard/ObservationPost";
import { useParams, useNavigate } from "react-router-dom";
import { crewService } from "../api/crewService";
import { logService } from "../api/logService";
import SingleObservationModal from "../components/posts/SingleObservationModal";
import SingleEventModal from "../components/crews/SingleEventModal";
import { useAuth } from "../context/AuthContext";

const CrewDashboardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Crew Feed");
  const [crew, setCrew] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [events, setEvents] = useState([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const loadCrewData = async () => {
      try {
        const crewData = await crewService.getCrew(id);
        setCrew(crewData);

        try {
          const logsData = await logService.getCrewLogs(id);
          setLogs(logsData);
          const eventsData = await crewService.getEvents(id);
          setEvents(eventsData);
        } catch (err) {
          console.error("Failed to fetch logs or events", err);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadCrewData();
  }, [id]);

  const handleCommentAdded = (logId) => {
    setLogs((prevLogs) => prevLogs.map((l) => (l.id === logId ? { ...l, comments_count: parseInt(l.comments_count || 0) + 1 } : l)));
    if (selectedLog && selectedLog.id === logId) {
      setSelectedLog((prev) => ({ ...prev, comments_count: parseInt(prev.comments_count || 0) + 1 }));
    }
  };

  const handleCrewUpdated = async () => {
    try {
      const crewData = await crewService.getCrew(id);
      setCrew(crewData);
    } catch (err) {
      console.error("Failed to reload crew data", err);
    }
  };

  const handleEventCreated = async () => {
    try {
      const eventsData = await crewService.getEvents(id);
      setEvents(eventsData);
      setActiveTab("Viewing Parties");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRsvpChanged = async () => {
    try {
      const eventsData = await crewService.getEvents(id);
      setEvents(eventsData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLeaveCrew = async () => {
    if (!window.confirm("Are you sure you want to leave this crew?")) return;
    try {
      await crewService.removeMember(crew.id, user.id);
      alert("You have left the crew.");
      navigate("/crews");
    } catch (err) {
      console.error("Failed to leave crew", err);
      alert("Failed to leave crew.");
    }
  };

  if (isLoading || !crew) {
    return (
      <div className="flex w-full h-screen bg-[#0B1021] text-white items-center justify-center">
        <span className="text-xl font-medium animate-pulse text-purple-400">Loading Crew Data...</span>
      </div>
    );
  }

  const isOwner = crew.current_user_role === "owner";
  const isAdmin = crew.current_user_role === "admin";
  const canManage = isOwner || isAdmin;

  const tabs = ["Crew Feed", "Viewing Parties"];
  if (canManage) {
    tabs.push("Manage Crew");
  }

  return (
    <div className="flex w-full h-screen bg-[#0B1021] text-white overflow-hidden relative">
      <SingleObservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} log={selectedLog} onCommentAdded={handleCommentAdded} />
      <SingleEventModal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} event={selectedEvent} onRsvpChanged={handleRsvpChanged} />
      <Sidebar />

      <div className="flex-1 ml-64 overflow-y-auto custom-scrollbar h-screen">
        <div className="flex min-h-full">
          <main className="flex-1 px-8 py-6 pb-24">
            <div className="max-w-5xl flex flex-col gap-8">
              <div className="relative mb-12 mt-2">
                <div
                  className="h-40 w-full rounded-2xl bg-cover bg-center border border-slate-800 relative shadow-lg"
                  style={{
                    backgroundImage: `url('${crew.cover_image_url || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop"}')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1021]/80 to-transparent rounded-2xl"></div>
                </div>

                <div className="absolute -bottom-10 left-8 flex items-end gap-5">
                  <div className="w-24 h-24 rounded-full border-4 border-[#0B1021] bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                    <img src={crew.badge_url || "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=300&auto=format&fit=crop"} alt="Crew Badge" className="w-full h-full object-cover bg-[#0B1021]" />
                  </div>

                  <div className="mb-2">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">{crew.name}</h1>
                    <p className="text-sm text-slate-300 font-medium mt-1.5 flex items-center gap-2 drop-shadow-md">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs text-white border border-slate-700">Crew</span>
                      <span>•</span>
                      <span>{crew.member_count} Members</span>
                      <span>•</span>
                      <span>{crew.log_count} Shared Logs</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {crew.location || "Global"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {crew.description && <div className="px-2 mb-8 -mt-4 text-slate-300 leading-relaxed text-[15px] max-w-4xl">{crew.description}</div>}

              <div className="flex gap-8 border-b border-slate-800 relative">
                {tabs.map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 font-medium transition-all duration-200 ${activeTab === tab ? "text-white border-b-2 border-purple-500 shadow-[0_4px_10px_-2px_rgba(168,85,247,0.4)]" : "text-slate-500 hover:text-slate-300"}`}>
                    {tab}
                  </button>
                ))}

                {(crew.current_user_role === "member" || crew.current_user_role === "admin") && (
                  <button onClick={handleLeaveCrew} className="ml-auto flex items-center gap-2 px-3 py-1.5 mb-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors text-sm font-medium">
                    <LogOut size={16} />
                    Leave Crew
                  </button>
                )}
              </div>

              <div className="py-4">
                {activeTab === "Crew Feed" && (
                  <div className="flex flex-col gap-6">
                    {logs.length > 0 ? (
                      logs.map((log) => (
                        <ObservationPost
                          key={log.id}
                          log={log}
                          onClick={() => {
                            setSelectedLog(log);
                            setIsModalOpen(true);
                          }}
                        />
                      ))
                    ) : (
                      <div className="py-12 flex flex-col items-center justify-center text-slate-500">
                        <p className="text-lg font-medium">No logs yet.</p>
                        <p className="text-sm">Be the first to share an observation!</p>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === "Viewing Parties" && (
                  <div className="flex flex-col gap-6">
                    {events.length > 0 ? (
                      events.map((event) => {
                        const isFull = event.max_attendees && event.attendee_count >= event.max_attendees;
                        return (
                          <div
                            key={event.id}
                            onClick={() => {
                              setSelectedEvent(event);
                              setIsEventModalOpen(true);
                            }}
                            className="cursor-pointer bg-[#0F1428]/80 backdrop-blur-md border border-slate-800 rounded-xl p-5 hover:border-purple-500/50 hover:bg-slate-800 transition-all shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                          >
                            <div className="flex flex-col gap-1.5">
                              <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{event.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-slate-400">
                                <span className="flex items-center gap-1.5">
                                  <MapPin size={14} /> {event.location}
                                </span>
                                <span className="flex items-center gap-1.5 text-purple-400">
                                  {new Date(event.start_time).toLocaleDateString()} at{" "}
                                  {new Date(event.start_time).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex flex-col items-end">
                                <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Attendees</span>
                                <span className={`text-lg font-bold ${isFull ? "text-red-400" : "text-emerald-400"}`}>
                                  {event.attendee_count} {event.max_attendees ? `/ ${event.max_attendees}` : ""}
                                </span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedEvent(event);
                                  setIsEventModalOpen(true);
                                }}
                                className="px-4 py-2 bg-slate-800 group-hover:bg-purple-600 text-white rounded-lg transition-colors text-sm font-medium border border-slate-700 group-hover:border-purple-500"
                              >
                                View
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-12 flex flex-col items-center justify-center text-slate-500 bg-[#0F1428]/40 border border-slate-800/60 rounded-2xl border-dashed">
                        <p className="text-lg font-medium">No viewing parties scheduled.</p>
                        <p className="text-sm">Owners and Admins can create one in the Manage tab.</p>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === "Manage Crew" && canManage && <ManageCrewPanel crew={crew} onCrewUpdated={handleCrewUpdated} onEventCreated={handleEventCreated} />}
              </div>
            </div>
          </main>

          <aside className="w-80 border-l border-slate-800 shrink-0 sticky top-0 h-screen overflow-hidden bg-[#070A14]/50 backdrop-blur-md">
            <div className="p-6 flex flex-col h-full">
              <CrewNavigatorsWidget crewId={crew.id} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CrewDashboardPage;
