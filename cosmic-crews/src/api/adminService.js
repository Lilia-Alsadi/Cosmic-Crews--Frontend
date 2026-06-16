import axiosClient from "./axiosClient";

export const adminService = {
  getStats: async () => {
    const response = await axiosClient.get("/api/admin/stats");
    return response.data;
  },

  getUsers: async () => {
    const response = await axiosClient.get("/api/admin/users");
    return response.data;
  },

  updateUserStatus: async (id, status) => {
    const response = await axiosClient.put(`/api/admin/users/${id}/status`, {
      status,
    });
    return response.data;
  },

  getFlaggedItems: async () => {
    const response = await axiosClient.get("/api/admin/flagged-items");
    return response.data;
  },

  deleteLog: async (id) => {
    const response = await axiosClient.delete(`/api/admin/logs/${id}`);
    return response.data;
  },

  dismissFlag: async (id) => {
    const response = await axiosClient.put(`/api/admin/logs/${id}/dismiss`);
    return response.data;
  },

  deleteComment: async (id) => {
    const response = await axiosClient.delete(`/api/admin/comments/${id}`);
    return response.data;
  },

  dismissCommentFlag: async (id) => {
    const response = await axiosClient.put(`/api/admin/comments/${id}/dismiss`);
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await axiosClient.delete(`/api/admin/users/${userId}`);
    return response.data;
  },

  getCrews: async () => {
    const response = await axiosClient.get("/api/admin/crews");
    return response.data;
  },

  deleteCrew: async (id) => {
    const response = await axiosClient.delete(`/api/admin/crews/${id}`);
    return response.data;
  },

  updateCrew: async (id, data) => {
    const response = await axiosClient.put(`/api/admin/crews/${id}`, data);
    return response.data;
  },

  getCrewEvents: async (crewId) => {
    const response = await axiosClient.get(`/api/admin/crews/${crewId}/events`);
    return response.data;
  },
  updateEvent: async (eventId, data) => {
    const response = await axiosClient.put(`/api/admin/events/${eventId}`, data);
    return response.data;
  },
  
  deleteEvent: async (eventId) => {
    const response = await axiosClient.delete(`/api/admin/events/${eventId}`);
    return response.data;
  },
};
