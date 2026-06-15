import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import { MapPin } from 'lucide-react';
import ManageCrewPanel from '../components/crews/ManageCrewPanel';
import UpcomingViewingPartiesWidget from '../components/crews/UpcomingViewingPartiesWidget';
import ObservationPost from '../components/dashboard/ObservationPost';

const CrewDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('Crew Feed');
  const [isOwner, setIsOwner] = useState(true);

  const tabs = ['Crew Feed', 'Viewing Parties'];
  if (isOwner) {
    tabs.push('Manage Crew');
  }

  return (
    <div className="flex w-full h-screen bg-[#0B1021] text-white overflow-hidden relative">
      <Sidebar />
      
      <div className="flex-1 ml-64 overflow-y-auto custom-scrollbar h-screen">
        <div className="flex min-h-full">
          
          <main className="flex-1 px-8 py-6 pb-24">
            <div className="max-w-5xl flex flex-col gap-8">
              
              <div className="relative mb-12 mt-2">
                <div 
                  className="h-40 w-full rounded-2xl bg-cover bg-center border border-slate-800 relative shadow-lg"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop')" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1021]/80 to-transparent rounded-2xl"></div>
                </div>
                
                <div className="absolute -bottom-10 left-8 flex items-end gap-5">
                  <div className="w-24 h-24 rounded-full border-4 border-[#0B1021] bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                    <img 
                      src="https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=300&auto=format&fit=crop" 
                      alt="Crew Badge"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="mb-2">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
                      Deep Sky Navigators
                    </h1>
                    <p className="text-sm text-slate-300 font-medium mt-1.5 flex items-center gap-2 drop-shadow-md">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs text-white border border-slate-700">Public Group</span>
                      <span>•</span>
                      <span>42 Members</span>
                      <span>•</span>
                      <span>158 Shared Logs</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> Atacama Desert, Chile</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-8 border-b border-slate-800">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 font-medium transition-all duration-200 ${
                      activeTab === tab
                        ? 'text-white border-b-2 border-purple-500 shadow-[0_4px_10px_-2px_rgba(168,85,247,0.4)]'
                        : 'text-slate-500 hover:text-slate-300'
                    } ${tab === 'Manage Crew' ? 'ml-auto text-pink-400 hover:text-pink-300' : ''}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="py-4">
                {activeTab === 'Crew Feed' && (
                  <div className="flex flex-col gap-6">
                    <ObservationPost onClick={() => {}} />
                    <ObservationPost onClick={() => {}} />
                    <ObservationPost onClick={() => {}} />
                  </div>
                )}
                {activeTab === 'Viewing Parties' && (
                  <div className="w-full h-64 border-2 border-dashed border-slate-800/60 bg-slate-900/20 rounded-2xl flex flex-col items-center justify-center text-slate-500">
                    <span className="font-medium text-lg text-slate-400 mb-2">Viewing Parties Placeholder</span>
                    <span className="text-sm">Upcoming group sessions will be displayed here.</span>
                  </div>
                )}
                {activeTab === 'Manage Crew' && isOwner && (
                  <ManageCrewPanel />
                )}
              </div>

            </div>
          </main>

          <aside className="w-80 border-l border-slate-800 shrink-0 sticky top-0 h-screen overflow-hidden bg-[#070A14]/50 backdrop-blur-md">
            <div className="p-6 flex flex-col h-full">
              <UpcomingViewingPartiesWidget />
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default CrewDashboardPage;
