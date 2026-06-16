import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import DirectoryHeader from "../components/crews/DirectoryHeader";
import CrewCard from "../components/crews/CrewCard";
import Sidebar from "../components/layout/Sidebar";
import CreateCrewModal from "../components/crews/CreateCrewModal";
import { crewService } from "../api/crewService";

const CrewsDirectoryPage = () => {
  const [activeTab, setActiveTab] = useState("Explore");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [crews, setCrews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCrews = async () => {
    try {
      const data = await crewService.getAllCrews();
      setCrews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCrews();
  }, []);

  const exploreCrews = crews.filter((c) => !c.current_user_role || c.current_user_role === "none" || c.current_user_role === "pending");
  const joinedCrews = crews.filter((c) => c.current_user_role === "member" || c.current_user_role === "admin");
  const managedCrews = crews.filter((c) => c.current_user_role === "owner");

  const handleRequestToJoin = (crew) => {
    setToast({
      show: true,
      message: `Request sent to the owner of ${crew.name}!`,
    });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const renderCrews = () => {
    switch (activeTab) {
      case "Explore":
        return exploreCrews.map((crew) => (
          <CrewCard
            key={crew.id}
            title={crew.name}
            memberCount={crew.member_count}
            location={crew.location}
            description={crew.description}
            image={crew.image_url || crew.cover_image_url || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop"}
            buttonText={crew.current_user_role === "pending" ? "Request Sent" : "Request to Join"}
            buttonVariant={crew.current_user_role === "pending" ? "outline" : "solid"}
            onClick={async () => {
              if (crew.current_user_role === "pending") return;
              try {
                await crewService.joinCrew(crew.id);
                handleRequestToJoin(crew);
                fetchCrews();
              } catch (e) {
                console.error(e);
              }
            }}
          />
        ));
      case "Joined Crews":
        if (joinedCrews.length === 0) {
          return (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-500">
              <p className="text-lg font-medium">You haven't joined any crews yet.</p>
              <p className="text-sm">Explore the directory to find a crew that matches your interests!</p>
            </div>
          );
        }
        return joinedCrews.map((crew) => <CrewCard key={crew.id} title={crew.name} memberCount={crew.member_count} location={crew.location} description={crew.description} image={crew.image_url || crew.cover_image_url || "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2000&auto=format&fit=crop"} buttonText="Go to Dashboard" buttonVariant="solid" onClick={() => navigate(`/crew/${crew.id}`)} />);
      case "Managed by Me":
        if (managedCrews.length === 0) {
          return (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-500">
              <p className="text-lg font-medium">You don't manage any crews.</p>
              <p className="text-sm">Initialize a new crew to start leading your own team of stargazers!</p>
            </div>
          );
        }
        return managedCrews.map((crew) => <CrewCard key={crew.id} title={crew.name} memberCount={crew.member_count} location={crew.location} description={crew.description} image={crew.image_url || crew.cover_image_url || "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=2000&auto=format&fit=crop"} buttonText="Manage Crew" buttonVariant="manage" onClick={() => navigate(`/crew/${crew.id}`)} />);
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full h-screen bg-[#0B1021] text-white overflow-hidden relative">
      <Sidebar />

      <div className="flex-1 ml-64 overflow-y-auto custom-scrollbar h-screen">
        <main className="p-8 max-w-7xl">
          <DirectoryHeader activeTab={activeTab} onTabChange={setActiveTab} onCreateClick={() => setIsCreateModalOpen(true)} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 pb-12">{renderCrews()}</div>
        </main>
      </div>

      <CreateCrewModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          fetchCrews();
        }}
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
