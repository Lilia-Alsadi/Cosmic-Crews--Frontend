import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import DirectoryHeader from '../components/crews/DirectoryHeader';
import CrewCard from '../components/crews/CrewCard';
import Sidebar from '../components/layout/Sidebar';
import CreateCrewModal from '../components/crews/CreateCrewModal';

const exploreCrews = [
  { id: 1, title: 'Deep Sky Navigators', memberCount: 42, location: 'Atacama Desert, Chile', description: 'A group of passionate amateur astronomers exploring deep sky objects.', image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop' },
  { id: 2, title: 'Lunar Observers Society', memberCount: 156, location: 'Global / Online', description: 'Dedicated to mapping and observing lunar craters and seas.', image: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?q=80&w=2000&auto=format&fit=crop' },
  { id: 3, title: 'Mars Colonists', memberCount: 89, location: 'Houston, TX', description: 'Preparing for the future by studying the red planet today.', image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2000&auto=format&fit=crop' },
];

const joinedCrews = [
  { id: 4, title: 'Orion Nebula Enthusiasts', memberCount: 24, location: 'Mauna Kea, HI', description: 'Focused entirely on the Orion constellation and its surrounding nebulas.', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2000&auto=format&fit=crop' },
  { id: 5, title: 'Milky Way Chasers', memberCount: 312, location: 'Global / Online', description: 'Astrophotography group dedicated to capturing the Milky Way core.', image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2000&auto=format&fit=crop' },
];

const managedCrews = [
  { id: 6, title: 'Local Star Party', memberCount: 12, location: 'Amman, Jordan', description: 'Organizing weekly meetups for local telescope owners.', image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=2000&auto=format&fit=crop' },
];

const CrewsDirectoryPage = () => {
  const [activeTab, setActiveTab] = useState('Explore');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  const navigate = useNavigate();

  const handleRequestToJoin = (crew) => {
    setToast({ show: true, message: `Request sent to the owner of ${crew.title}!` });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const renderCrews = () => {
    switch (activeTab) {
      case 'Explore':
        return exploreCrews.map(crew => (
          <CrewCard 
            key={crew.id} 
            title={crew.title}
            memberCount={crew.memberCount}
            location={crew.location}
            description={crew.description}
            image={crew.image}
            buttonText="Request to Join"
            buttonVariant="solid"
            onClick={() => handleRequestToJoin(crew)}
          />
        ));
      case 'Joined Crews':
        return joinedCrews.map(crew => (
          <CrewCard 
            key={crew.id} 
            title={crew.title}
            memberCount={crew.memberCount}
            location={crew.location}
            description={crew.description}
            image={crew.image}
            buttonText="Go to Dashboard"
            buttonVariant="solid"
            onClick={() => navigate(`/crew/${crew.id}`)}
          />
        ));
      case 'Managed by Me':
        return managedCrews.map(crew => (
          <CrewCard 
            key={crew.id} 
            title={crew.title}
            memberCount={crew.memberCount}
            location={crew.location}
            description={crew.description}
            image={crew.image}
            buttonText="Manage Crew"
            buttonVariant="outline"
            onClick={() => navigate(`/crew/${crew.id}`)}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full h-screen bg-[#0B1021] text-white overflow-hidden relative">
      <Sidebar />
      
      <div className="flex-1 ml-64 overflow-y-auto custom-scrollbar h-screen">
        <main className="p-8 max-w-7xl">
          <DirectoryHeader 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            onCreateClick={() => setIsCreateModalOpen(true)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 pb-12">
            {renderCrews()}
          </div>
        </main>
      </div>

      <CreateCrewModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />

      {toast.show && (
        <div className="fixed bottom-10 right-10 z-50 bg-emerald-500/20 border border-emerald-500 text-emerald-100 px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] backdrop-blur-md flex items-center gap-3 animate-in slide-in-from-bottom-5 transition-all duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default CrewsDirectoryPage;
