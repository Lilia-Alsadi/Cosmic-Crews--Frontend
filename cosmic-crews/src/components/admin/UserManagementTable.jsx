import React, { useState, useEffect } from "react";
import { Search, Key, Ban, Trash2 } from "lucide-react";
import { adminService } from "../../api/adminService";
import { DEFAULT_AVATAR } from "../../utils/constants";

const UserManagementTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");

  const loadUsers = async () => {
    try {
      const data = await adminService.getUsers();
      setUsers(data);
    } catch (e) {
      console.log("failed to load", e);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleBan = async (id, currentStatus) => {
    const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";
    try {
      await adminService.updateUserStatus(id, newStatus);
      loadUsers();
    } catch (e) {
      console.log("ban toggle failed", e);
    }
  };

  const nukeUser = async (id) => {
    if (window.confirm("Admin: Are you sure you want to permanently delete this user and all their data?")) {
      try {
        await adminService.deleteUser(id);
        loadUsers();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const filteredUsers = users.filter((u) => u.username?.toLowerCase().includes(searchTxt.toLowerCase()) || u.email?.toLowerCase().includes(searchTxt.toLowerCase()));

  return (
    <div className="bg-[#0F1428] border border-slate-800 rounded-xl p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">User Directory</h2>
          <p className="text-sm text-slate-400 mt-1">Manage active accounts and permissions</p>
        </div>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500" />
          </div>
          <input type="text" placeholder="Search users..." value={searchTxt} onChange={(e) => setSearchTxt(e.target.value)} className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors" />
        </div>
      </div>

      <div className="overflow-x-auto mt-6 max-h-[500px] overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse whitespace-nowrap relative">
          <thead className="sticky top-0 bg-[#0F1428] z-10">
            <tr>
              <th className="text-slate-400 text-sm font-medium border-b border-slate-800 pb-3 pl-2">User</th>
              <th className="text-slate-400 text-sm font-medium border-b border-slate-800 pb-3">Email</th>
              <th className="text-slate-400 text-sm font-medium border-b border-slate-800 pb-3">Role</th>
              <th className="text-slate-400 text-sm font-medium border-b border-slate-800 pb-3">Status</th>
              <th className="text-slate-400 text-sm font-medium border-b border-slate-800 pb-3 text-right pr-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                <td className="py-4 pl-2">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar_url || DEFAULT_AVATAR} alt={user.username} className="w-8 h-8 rounded-full border border-slate-700 object-cover" />
                    <span className="font-semibold text-white">@{user.username}</span>
                  </div>
                </td>

                <td className="py-4 text-sm text-slate-300">{user.email}</td>

                <td className="py-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${user.role?.toLowerCase() === "admin" || user.role?.toLowerCase() === "platform_admin" ? "bg-purple-900/30 text-purple-400 border-purple-500/30" : "bg-slate-800 text-slate-300 border-slate-700"}`}>{user.role}</span>
                </td>

                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${user.status === "ACTIVE" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"}`}></span>
                    <span className={`text-sm font-medium ${user.status === "ACTIVE" ? "text-emerald-400" : "text-red-400"}`}>{user.status}</span>
                  </div>
                </td>

                <td className="py-4 pr-2">
                  <div className="flex items-center justify-end gap-2">
                    {user.role?.toLowerCase() !== "admin" && user.role?.toLowerCase() !== "platform_admin" && (
                      <>
                        <button onClick={() => toggleBan(user.id, user.status)} className="p-1.5 bg-transparent border border-orange-900/50 text-orange-400 hover:bg-orange-900/20 hover:text-orange-300 rounded-md transition-colors" title={user.status === "BANNED" ? "Unban" : "Suspend/Ban"}>
                          <Ban className="w-4 h-4" />
                        </button>
                        <button onClick={() => nukeUser(user.id)} className="p-1.5 bg-transparent border border-red-900/50 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-md transition-colors" title="Delete User">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementTable;
