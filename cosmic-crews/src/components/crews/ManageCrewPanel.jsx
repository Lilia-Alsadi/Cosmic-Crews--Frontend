import React, { useState, useEffect } from "react";
import { UserPlus, Check, X, Users, Trash2, AlertTriangle, Settings, Image as ImageIcon } from "lucide-react";
import { crewService } from "../../api/crewService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { DEFAULT_AVATAR } from "../../utils/constants";
import CreateEventForm from "./CreateEventForm";

const ManageCrewPanel = ({ crew, onCrewUpdated, onEventCreated }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [editForm, setEditForm] = useState({
    name: crew?.name || "",
    description: crew?.description || "",
    location: crew?.location || "",
    badge_url: crew?.badge_url || "",
    cover_image_url: crew?.cover_image_url || "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const fetchMembers = async () => {
    try {
      const data = await crewService.getMembers(crew?.id);
      setMembers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (crew?.id) fetchMembers();
  }, [crew?.id]);

  const handleUpdateRole = async (userId, role) => {
    try {
      await crewService.updateMemberRole(crew?.id, userId, role);
      fetchMembers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (userId) => {
    try {
      await crewService.removeMember(crew?.id, userId);
      fetchMembers();
    } catch (err) {
      console.error(err);
    }
  };

  const pendingRequests = members.filter((m) => m.role === "pending");
  const roster = members.filter((m) => m.role !== "pending");
  const isOwner = roster.some((m) => m.role === "owner" && m.user_id === user?.id);
  const isAdmin = roster.some((m) => m.role === "admin" && m.user_id === user?.id);
  const isManager = isOwner || isAdmin;

  const handleDeleteCrew = async () => {
    if (!window.confirm("Are you ABSOLUTELY sure you want to delete this crew? This action cannot be undone and will delete all logs, events, and memberships associated with the crew.")) {
      return;
    }

    try {
      await crewService.deleteCrew(crew?.id);
      alert("Crew successfully deleted.");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to delete crew.");
    }
  };

  const handleEditSubmit = async () => {
    setIsSaving(true);
    try {
      await crewService.updateCrew(crew.id, editForm);
      if (onCrewUpdated) onCrewUpdated();
      alert("Crew details updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update crew");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadData = new FormData();
    uploadData.append("image", file);
    try {
      const res = await crewService.uploadImage(uploadData);
      setEditForm((prev) => ({ ...prev, [field]: res.image_url }));
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  if (isLoading) return <div className="text-slate-400">Loading members...</div>;

  return (
    <div className="flex flex-col gap-8 w-full">
      {isOwner && (
        <div className="bg-[#0F1428]/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-pink-500/20 rounded-lg">
              <Settings className="w-5 h-5 text-pink-400" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide">Edit Crew Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-400">Crew Name</label>
              <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-400">Location</label>
              <input type="text" value={editForm.location} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-medium text-slate-400">Description</label>
              <textarea rows="3" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"></textarea>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-400 mb-1">Crew Emblem (Badge)</label>
              <div onClick={() => document.getElementById("badge-upload").click()} className="relative h-32 w-32 rounded-xl border-2 border-dashed border-slate-700 hover:border-purple-500 bg-slate-900/50 flex flex-col items-center justify-center cursor-pointer overflow-hidden group transition-colors">
                {editForm.badge_url ? <img src={editForm.badge_url} alt="Emblem" className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" /> : <ImageIcon className="w-6 h-6 text-slate-500 mb-2" />}
                <span className="text-xs text-slate-400 absolute bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">Upload</span>
                <input type="file" id="badge-upload" className="hidden" accept="image/*" onChange={(e) => handleUpload(e, "badge_url")} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-400 mb-1">Crew Banner (Cover)</label>
              <div onClick={() => document.getElementById("banner-upload").click()} className="relative h-32 w-full rounded-xl border-2 border-dashed border-slate-700 hover:border-purple-500 bg-slate-900/50 flex flex-col items-center justify-center cursor-pointer overflow-hidden group transition-colors">
                {editForm.cover_image_url ? <img src={editForm.cover_image_url} alt="Banner" className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" /> : <ImageIcon className="w-6 h-6 text-slate-500 mb-2" />}
                <span className="text-xs text-slate-400 absolute bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">Upload Banner</span>
                <input type="file" id="banner-upload" className="hidden" accept="image/*" onChange={(e) => handleUpload(e, "cover_image_url")} />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={handleEditSubmit} disabled={isSaving} className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors disabled:opacity-50">
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}

      {isManager && <CreateEventForm crewId={crew.id} onEventCreated={onEventCreated} />}

      <div className="bg-[#0F1428]/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <UserPlus className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">Pending Membership Requests</h2>
          <span className="ml-auto bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">{pendingRequests.length}</span>
        </div>

        <div className="flex flex-col gap-4">
          {pendingRequests.map((req) => (
            <div key={req.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:bg-slate-900/60 transition-colors">
              <div className="flex items-center gap-4">
                <img src={req.user?.avatar_url || DEFAULT_AVATAR} alt={req.user?.username} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                <div>
                  <p className="text-white font-medium">{req.user?.username}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Requested {req.created_at ? new Date(req.created_at).toLocaleDateString() : "recently"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleUpdateRole(req.user_id, "member")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors text-sm font-medium">
                  <Check className="w-4 h-4" />
                  Accept
                </button>
                <button onClick={() => handleRemove(req.user_id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 transition-colors text-sm font-medium">
                  <X className="w-4 h-4" />
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0F1428]/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Users className="w-5 h-5 text-indigo-400" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">Crew Roster</h2>
        </div>

        <div className="flex flex-col gap-3">
          {roster.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/30 transition-colors border border-transparent hover:border-slate-800/50">
              <div className="flex items-center gap-4">
                <img src={member.user?.avatar_url || DEFAULT_AVATAR} alt={member.user?.username} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                <p className="text-slate-200 font-medium">{member.user?.username}</p>
              </div>
              <div className="flex items-center gap-4">
                {member.role === "owner" && <span className="bg-purple-900/60 text-purple-300 border border-purple-500/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(168,85,247,0.2)]">Owner</span>}
                {member.role === "admin" && <span className="bg-indigo-900/40 text-indigo-300 border border-indigo-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Admin</span>}
                {member.role === "member" && <span className="bg-transparent text-slate-400 border border-slate-600/50 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Member</span>}

                {member.role !== "owner" ? (
                  <button onClick={() => handleRemove(member.user_id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Remove Member">
                    <Trash2 className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="w-8"></div> /* Spacer to keep alignment clean */
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isOwner && (
        <div className="bg-red-950/20 border border-red-900/50 rounded-2xl p-6 shadow-xl mt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-red-400 tracking-wide">Danger Zone</h2>
          </div>
          <p className="text-slate-400 text-sm mb-6">Deleting this crew is a permanent action. All observation logs, events, and membership data will be erased and cannot be recovered.</p>
          <button onClick={handleDeleteCrew} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 hover:border-red-500/50 transition-colors font-medium shadow-lg">
            <Trash2 className="w-5 h-5" />
            Delete Crew
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageCrewPanel;
