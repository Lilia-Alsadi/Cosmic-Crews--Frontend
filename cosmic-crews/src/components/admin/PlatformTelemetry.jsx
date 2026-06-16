import React, { useState, useEffect } from "react";
import { Users, Rocket, Camera } from "lucide-react";
import { adminService } from "../../api/adminService";

const PlatformTelemetry = () => {
  const [stats, setStats] = useState({
    total_users: 0,
    total_crews: 0,
    total_logs: 0,
  });

  useEffect(() => {
    adminService.getStats().then(setStats).catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <div className="bg-[#0F1428] border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs tracking-wider text-slate-400 uppercase font-semibold">Total Observers</h3>
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <span className="text-4xl font-bold text-white mt-2">{stats.total_users || 0}</span>
        </div>
      </div>

      <div className="bg-[#0F1428] border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl"></div>
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs tracking-wider text-slate-400 uppercase font-semibold">Active Crews</h3>
            <Rocket className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-4xl font-bold text-white mt-2">{stats.total_crews || 0}</span>
        </div>
      </div>

      <div className="bg-[#0F1428] border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl"></div>
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs tracking-wider text-slate-400 uppercase font-semibold">Total Observations Logged</h3>
            <Camera className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-4xl font-bold text-white mt-2">{stats.total_logs || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default PlatformTelemetry;
