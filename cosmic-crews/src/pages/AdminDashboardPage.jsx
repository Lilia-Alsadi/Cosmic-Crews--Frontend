import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import PlatformTelemetry from "../components/admin/PlatformTelemetry";
import UserManagementTable from "../components/admin/UserManagementTable";
import ContentModerationQueue from "../components/admin/ContentModerationQueue";
import CrewManagementTable from "../components/admin/CrewManagementTable";

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="flex w-full h-screen bg-[#0B1021] text-white overflow-hidden relative">
      <Sidebar />

      <div className="flex-1 md:ml-64 overflow-y-auto custom-scrollbar h-screen pb-20 md:pb-0">
        <main className="p-8 max-w-[1400px] flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 tracking-tight drop-shadow-lg">Mission Control</h1>
            <p className="text-slate-400 mt-2">Global Platform Administration</p>
          </div>

          <PlatformTelemetry />

          <div className="flex flex-col gap-6">
            <div className="flex gap-4 border-b border-slate-800">
              <button onClick={() => setActiveTab("users")} className={`pb-3 px-2 font-medium transition-colors ${activeTab === "users" ? "border-b-2 border-blue-500 text-blue-400" : "text-slate-400 hover:text-slate-200"}`}>
                Users Directory
              </button>
              <button onClick={() => setActiveTab("crews")} className={`pb-3 px-2 font-medium transition-colors ${activeTab === "crews" ? "border-b-2 border-blue-500 text-blue-400" : "text-slate-400 hover:text-slate-200"}`}>
                Crew Management
              </button>
              <button onClick={() => setActiveTab("moderation")} className={`pb-3 px-2 font-medium transition-colors ${activeTab === "moderation" ? "border-b-2 border-red-500 text-red-400" : "text-slate-400 hover:text-slate-200"}`}>
                Moderation Queue
              </button>
            </div>

            <div className="mt-2 min-h-[600px]">
              {activeTab === "users" && <UserManagementTable />}
              {activeTab === "crews" && <CrewManagementTable />}
              {activeTab === "moderation" && (
                <div className="h-[800px]">
                  <ContentModerationQueue />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
