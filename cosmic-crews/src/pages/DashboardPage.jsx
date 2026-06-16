import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import CosmicAlertsBanner from "../components/dashboard/CosmicAlertsBanner";
import StargazingIndexWidget from "../components/dashboard/StargazingIndexWidget";
import ObservationPost from "../components/dashboard/ObservationPost";
import CosmicEventsWidget from "../components/dashboard/CosmicEventsWidget";
import TargetOfTheNightWidget from "../components/dashboard/TargetOfTheNightWidget";
import SingleObservationModal from "../components/posts/SingleObservationModal";
import { useAuth } from "../context/AuthContext";
import { observationService } from "../api/observationService";

const DashboardPage = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [stargazingIndex, setStargazingIndex] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLogs = () => {
    if (user) {
      setIsLoading(true);
      observationService
        .getGlobalObservations({ feed: "popular" })
        .then((data) => setLogs(data))
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [user]);

  const handleCommentAdded = (logId) => {
    setLogs((prevLogs) => prevLogs.map((l) => (l.id === logId ? { ...l, comments_count: parseInt(l.comments_count || 0) + 1 } : l)));
    if (selectedLog && selectedLog.id === logId) {
      setSelectedLog((prev) => ({
        ...prev,
        comments_count: parseInt(prev.comments_count || 0) + 1,
      }));
    }
  };

  return (
    <div className="flex w-full h-screen bg-[#0B1021] text-white overflow-hidden relative">
      <Sidebar onObservationCreated={fetchLogs} />
      <div className="flex-1 md:ml-64 overflow-y-auto custom-scrollbar h-screen pb-20 md:pb-0">
        <div className="flex min-h-full">
          <main className="flex-1 px-8 py-6 pb-24">
            <div className="max-w-5xl flex flex-col gap-8">
              <CosmicAlertsBanner stargazingIndex={stargazingIndex} />

              <StargazingIndexWidget setGlobalIndex={setStargazingIndex} />

              <div className="flex flex-col gap-6 mt-4">
                {isLoading ? (
                  <div className="text-slate-400 py-4 animate-pulse">Loading feed...</div>
                ) : logs.length > 0 ? (
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
                  <div className="text-slate-500 py-12 text-center flex flex-col items-center">
                    <p className="text-lg font-medium">No popular logs yet.</p>
                    <p className="text-sm">Be the first to create an amazing observation log!</p>
                  </div>
                )}
              </div>
            </div>
          </main>

          <aside className="w-80 border-l border-slate-800 shrink-0 sticky top-0 h-screen overflow-hidden">
            <div className="p-6 flex flex-col gap-6 h-full">
              <div className="shrink-0">
                <TargetOfTheNightWidget />
              </div>
            </div>
          </aside>
        </div>
      </div>

      <SingleObservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} log={selectedLog} onCommentAdded={handleCommentAdded} />
    </div>
  );
};

export default DashboardPage;
