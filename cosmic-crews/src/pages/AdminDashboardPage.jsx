import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import PlatformTelemetry from '../components/admin/PlatformTelemetry';
import UserManagementTable from '../components/admin/UserManagementTable';
import ContentModerationQueue from '../components/admin/ContentModerationQueue';

const AdminDashboardPage = () => {
  return (
    <div className="flex w-full h-screen bg-[#0B1021] text-white overflow-hidden relative">
      <Sidebar />
      
      <div className="flex-1 ml-64 overflow-y-auto custom-scrollbar h-screen">
        <main className="p-8 max-w-[1400px] flex flex-col gap-8">
          
          <div>
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 tracking-tight drop-shadow-lg">
              Mission Control
            </h1>
            <p className="text-slate-400 mt-2">
              Global Platform Administration
            </p>
          </div>

          <PlatformTelemetry />

          <div className="flex flex-col gap-6">
            <div className="w-full">
              <UserManagementTable />
            </div>

            <div className="w-full h-[600px]">
              <ContentModerationQueue />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
