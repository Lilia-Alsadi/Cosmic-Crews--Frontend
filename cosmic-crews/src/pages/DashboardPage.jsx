import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import CosmicAlertsBanner from '../components/dashboard/CosmicAlertsBanner';
import StargazingIndexWidget from '../components/dashboard/StargazingIndexWidget';
import ObservationPost from '../components/dashboard/ObservationPost';
import CosmicEventsWidget from '../components/dashboard/CosmicEventsWidget';
import TargetOfTheNightWidget from '../components/dashboard/TargetOfTheNightWidget';
import SingleObservationModal from '../components/posts/SingleObservationModal';

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex w-full h-screen bg-[#0B1021] text-white overflow-hidden relative">
      <Sidebar />
       <div className="flex-1 ml-64 overflow-y-auto custom-scrollbar h-screen">
        <div className="flex min-h-full">
          
          <main className="flex-1 px-8 py-6 pb-24">
            <div className="max-w-5xl mx-auto flex flex-col gap-8">
              <CosmicAlertsBanner 
                title="High Visibility Alert!" 
                description="The Stargazing Index is at 88 tonight. Perfect conditions for deep-sky nebulae observation. Geminids Meteor Shower peaks at midnight!"
              />

              <StargazingIndexWidget />

              <div className="flex flex-col gap-6 mt-4">
                <ObservationPost onClick={() => setIsModalOpen(true)} />
                <ObservationPost onClick={() => setIsModalOpen(true)} />
                <ObservationPost onClick={() => setIsModalOpen(true)} />
              </div>
            </div>
          </main>

          <aside className="w-80 border-l border-slate-800 shrink-0 sticky top-0 h-screen overflow-hidden">
            <div className="p-6 flex flex-col gap-6 h-full">
              <div className="flex-1 overflow-hidden">
                <CosmicEventsWidget />
              </div>
              <div className="shrink-0">
                <TargetOfTheNightWidget />
              </div>
            </div>
          </aside>

        </div>
      </div>

      <SingleObservationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default DashboardPage;
