import React, { useState } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import SkyMilesWidget from '../components/profile/SkyMilesWidget';
import ObservationGallery from '../components/profile/ObservationGallery';
import ProfileCrewsWidget from '../components/profile/ProfileCrewsWidget';
import Sidebar from '../components/layout/Sidebar';
import SingleObservationModal from '../components/posts/SingleObservationModal';
import EditProfileModal from '../components/profile/EditProfileModal';

const ProfilePage = () => {
  const [isObservationModalOpen, setIsObservationModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  return (
    <div className="flex w-full h-screen bg-[#0B1021] text-white overflow-hidden relative">
      <Sidebar />
      <div className="flex-1 ml-64 overflow-y-auto custom-scrollbar h-screen">
        <main className="min-h-screen bg-[#0B1021] text-white p-8 max-w-6xl mx-auto flex flex-col gap-10">
          
          <ProfileHeader onEditClick={() => setIsEditProfileModalOpen(true)} />
          <SkyMilesWidget />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ObservationGallery onObservationClick={() => setIsObservationModalOpen(true)} />
            <ProfileCrewsWidget />
          </div>

        </main>
      </div>

      <SingleObservationModal 
        isOpen={isObservationModalOpen} 
        onClose={() => setIsObservationModalOpen(false)} 
      />

      <EditProfileModal 
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
      />
    </div>
  );
};

export default ProfilePage;
