import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { crewService } from "../../api/crewService";
import { useAuth } from "../../context/AuthContext";

const ProfileCrewsWidget = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [crews, setCrews] = useState([]);

  useEffect(() => {
    if (user) {
      crewService
        .getAllCrews()
        .then((data) => {
          const userCrews = data.filter((c) => c.current_user_role && c.current_user_role !== "none");
          setCrews(userCrews);
        })
        .catch(console.error);
    }
  }, [user]);

  const getRoleColor = (role) => {
    if (role === "owner" || role === "admin") return "purple";
    return "blue";
  };

  return (
    <div className="col-span-1 flex flex-col gap-4">
      <h3 className="text-lg font-bold text-white tracking-wide">My Crews</h3>

      {crews.length === 0 ? (
        <div className="text-slate-400 py-4">You haven't joined any crews yet.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {crews.map((crew) => {
            const roleColor = getRoleColor(crew.current_user_role);
            return (
              <div
                key={crew.id}
                onClick={() => {
                  if (crew.current_user_role !== "pending") {
                    navigate(`/crew/${crew.id}`);
                  }
                }}
                className={`flex items-center gap-4 bg-[#0F1428] border border-slate-800 p-4 rounded-xl shadow-md transition-colors group ${crew.current_user_role === "pending" ? "opacity-70 cursor-not-allowed" : "hover:border-slate-700 cursor-pointer"}`}
              >
                <img src={crew.image_url || "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=100&auto=format&fit=crop"} alt={crew.name} className="w-10 h-10 rounded-full object-cover border border-slate-700 group-hover:border-slate-500 transition-colors" />

                <div className="flex flex-col items-start gap-1">
                  <span className="text-sm font-bold text-slate-200">{crew.name}</span>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${roleColor === "pink" ? "bg-pink-500/20 text-pink-400 border border-pink-500/30" : roleColor === "blue" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-purple-500/20 text-purple-400 border border-purple-500/30"}`}>{crew.current_user_role}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProfileCrewsWidget;
