import React, { useState, useEffect } from "react";
import { Crown, Shield, User, Loader2 } from "lucide-react";
import { crewService } from "../../api/crewService";
import { DEFAULT_AVATAR } from "../../utils/constants";

const CrewNavigatorsWidget = ({ crewId }) => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!crewId) return;
    const fetchMembers = async () => {
      try {
        const data = await crewService.getMembers(crewId);

        const activeMembers = data.filter((m) => m.role !== "pending");
        const roleOrder = { owner: 1, admin: 2, member: 3 };
        activeMembers.sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);

        setMembers(activeMembers);
      } catch (err) {
        console.error("Failed to load crew members", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [crewId]);

  return (
    <div className="bg-[#0B1021]/80 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-sm flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="font-bold text-white tracking-wide text-lg">Crew Navigators</h3>
        <span className="text-xs font-medium px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">{members.length}</span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
          </div>
        ) : members.length === 0 ? (
          <div className="text-sm text-slate-500 text-center mt-6">No active navigators found.</div>
        ) : (
          <div className="flex flex-col gap-3">
            {members.map((member) => {
              const isOwner = member.role === "owner";
              const isAdmin = member.role === "admin";

              return (
                <div key={member.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isOwner ? "bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/30" : isAdmin ? "bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50" : "bg-transparent border border-transparent hover:bg-slate-800/30"}`}>
                  <div className="relative shrink-0">
                    <img src={member.user?.avatar_url || DEFAULT_AVATAR} alt={member.user?.username} className={`w-10 h-10 rounded-full object-cover ${isOwner ? "ring-2 ring-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.3)]" : isAdmin ? "ring-1 ring-purple-500/50" : "border border-slate-700"}`} />
                    {isOwner && (
                      <div className="absolute -top-1.5 -right-1.5 bg-yellow-500 text-black p-0.5 rounded-full shadow-lg">
                        <Crown size={12} className="fill-black" />
                      </div>
                    )}
                    {!isOwner && isAdmin && (
                      <div className="absolute -top-1 -right-1 bg-purple-500 text-white p-0.5 rounded-full shadow-lg">
                        <Shield size={10} className="fill-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col overflow-hidden">
                    <span className={`text-sm font-semibold truncate ${isOwner ? "text-yellow-400" : "text-slate-200"}`}>@{member.user?.username || "Unknown"}</span>
                    <span className="text-xs text-slate-500 capitalize flex items-center gap-1">
                      {isOwner && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>}
                      {isAdmin && <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>}
                      {!isOwner && !isAdmin && <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>}
                      {member.role}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrewNavigatorsWidget;
