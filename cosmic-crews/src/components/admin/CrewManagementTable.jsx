import React, { useState, useEffect } from "react";
import { Users, MoreVertical, Search, Edit2, Trash2 } from "lucide-react";
import { adminService } from "../../api/adminService";
import AdminCrewEditModal from "./AdminCrewEditModal";

const CrewManagementTable = () => {
  const [crews, setCrews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCrew, setSelectedCrew] = useState(null);

  const fetchCrews = () => {
    adminService.getCrews().then(setCrews).catch(console.error);
  };

  useEffect(() => {
    fetchCrews();
  }, []);

  const handleDeleteCrew = async (crewId) => {
    if (window.confirm("Are you sure you want to completely delete this crew? This action cannot be undone.")) {
      try {
        await adminService.deleteCrew(crewId);
        setCrews((prev) => prev.filter((c) => c.id !== crewId));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEditClick = (crew) => {
    setSelectedCrew(crew);
    setIsEditModalOpen(true);
  };

  const filteredCrews = crews.filter((crew) => crew.name.toLowerCase().includes(searchQuery.toLowerCase()) || (crew.owner_username && crew.owner_username.toLowerCase().includes(searchQuery.toLowerCase())));

  return (
    <>
      <div className="bg-[#0F1428] border border-slate-800 rounded-xl p-6 flex flex-col h-full max-h-[600px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold text-white">Crew Directory</h2>
            <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2.5 py-0.5 rounded-full ml-2">{crews.length} Total</span>
          </div>

          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-500" />
            </div>
            <input type="text" placeholder="Search crews or owners..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
          </div>
        </div>

        <div className="overflow-y-auto custom-scrollbar rounded-lg border border-slate-800">
          <table className="w-full text-left text-sm text-slate-400 relative">
            <thead className="text-xs uppercase bg-slate-800/80 text-slate-300 sticky top-0 backdrop-blur-sm z-10">
              <tr>
                <th className="px-4 py-3 font-semibold">Crew</th>
                <th className="px-4 py-3 font-semibold">Owner</th>
                <th className="px-4 py-3 font-semibold">Members</th>
                <th className="px-4 py-3 font-semibold">Logs</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCrews.length > 0 ? (
                filteredCrews.map((crew) => (
                  <tr key={crew.id} className="border-b border-slate-800 hover:bg-slate-800/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-200 flex items-center gap-3">
                      <img src={crew.badge_url || "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=150&auto=format&fit=crop"} alt="badge" className="w-8 h-8 rounded-full border border-slate-700 object-cover" />
                      <span className="truncate max-w-[150px]">{crew.name}</span>
                    </td>
                    <td className="px-4 py-3 text-purple-400">@{crew.owner_username}</td>
                    <td className="px-4 py-3">{crew.member_count}</td>
                    <td className="px-4 py-3">{crew.log_count}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEditClick(crew)} className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-md transition-colors" title="Edit Crew & Events">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteCrew(crew.id)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors" title="Delete Crew">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-slate-500">
                    No crews found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminCrewEditModal
        isOpen={isEditModalOpen}
        crew={selectedCrew}
        onClose={() => setIsEditModalOpen(false)}
        onCrewUpdated={(updatedCrew) => {
          setCrews((prev) => prev.map((c) => (c.id === updatedCrew.id ? { ...c, ...updatedCrew } : c)));
        }}
      />
    </>
  );
};

export default CrewManagementTable;
