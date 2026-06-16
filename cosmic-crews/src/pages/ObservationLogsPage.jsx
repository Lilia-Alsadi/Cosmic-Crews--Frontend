import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import ObservationPost from "../components/dashboard/ObservationPost";
import SingleObservationModal from "../components/posts/SingleObservationModal";
import { Search, Filter, Loader2 } from "lucide-react";
import { logService } from "../api/logService";

const ObservationLogsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLogs = () => {
    setIsLoading(true);
    const params = {};
    if (searchQuery.trim()) params.search = searchQuery;
    if (filterType !== "All") params.target = filterType;

    logService
      .getGlobalLogs(params)
      .then((data) => setLogs(data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLogs();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, filterType]);

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
      <Sidebar onLogCreated={fetchLogs} />

      <div className="flex-1 ml-64 overflow-y-auto custom-scrollbar h-screen">
        <div className="flex min-h-full">
          <main className="flex-1 px-8 py-8 pb-24">
            <div className="max-w-4xl flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 tracking-tight drop-shadow-lg">Global Observation Logs</h1>
                  <p className="text-slate-400 mt-2">Explore astrophotography and stargazing logs from the entire community.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative flex-1 w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-slate-500" />
                    </div>
                    <input type="text" placeholder="Search targets, equipment, or locations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors shadow-inner" />
                  </div>

                  <div className="relative shrink-0 w-full sm:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Filter className="h-4 w-4 text-slate-500" />
                    </div>
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-9 pr-8 text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors appearance-none cursor-pointer shadow-inner font-medium">
                      <option value="All">All Targets</option>
                      <option value="Galaxy">Galaxies</option>
                      <option value="Planet">Planets</option>
                      <option value="Nebula">Nebulae</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 relative min-h-[300px]">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0B1021]/50 backdrop-blur-sm z-10 rounded-xl">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                  </div>
                )}

                {logs.map((log) => (
                  <ObservationPost
                    key={log.id}
                    log={log}
                    onClick={() => {
                      setSelectedLog(log);
                      setIsModalOpen(true);
                    }}
                  />
                ))}

                {!isLoading && logs.length === 0 && (
                  <div className="py-12 flex flex-col items-center justify-center text-slate-500">
                    <Search className="w-12 h-12 mb-4 opacity-50" />
                    <p className="text-lg font-medium">No logs found.</p>
                    <p className="text-sm">Try adjusting your filters or search query.</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      <SingleObservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} log={selectedLog} onCommentAdded={handleCommentAdded} />
    </div>
  );
};

export default ObservationLogsPage;
