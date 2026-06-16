import React, { useState } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import SkyMilesWidget from "../components/profile/SkyMilesWidget";
import ObservationGallery from "../components/profile/ObservationGallery";
import ProfileCrewsWidget from "../components/profile/ProfileCrewsWidget";
import Sidebar from "../components/layout/Sidebar";
import SingleObservationModal from "../components/posts/SingleObservationModal";
import EditProfileModal from "../components/profile/EditProfileModal";

const ProfilePage = () => {
  const [isObservationModalOpen, setIsObservationModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const handleOpenLog = (log) => {
    setSelectedLog(log);
    setIsObservationModalOpen(true);
  };

  const handleCommentAdded = (logId) => {
    if (selectedLog && selectedLog.id === logId) {
      setSelectedLog((prev) => ({
        ...prev,
        comments_count: parseInt(prev.comments_count || 0) + 1,
      }));
    }
  };

  return (
    <div className="flex w-full h-screen bg-[#0B1021] text-white overflow-hidden relative">
      <Sidebar />
      <div className="flex-1 md:ml-64 overflow-y-auto custom-scrollbar h-screen pb-20 md:pb-0">
        <main className="min-h-screen bg-[#0B1021] text-white p-8 max-w-6xl flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <ProfileHeader onEditClick={() => setIsEditProfileModalOpen(true)} />
            <SkyMilesWidget />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ObservationGallery onObservationClick={handleOpenLog} />
            <ProfileCrewsWidget />
          </div>
        </main>
      </div>

      <SingleObservationModal isOpen={isObservationModalOpen} log={selectedLog} onClose={() => setIsObservationModalOpen(false)} onCommentAdded={handleCommentAdded} />

      <EditProfileModal isOpen={isEditProfileModalOpen} onClose={() => setIsEditProfileModalOpen(false)} />
    </div>
  );
};

export default ProfilePage;
