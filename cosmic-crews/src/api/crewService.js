import axiosClient from "./axiosClient";

export const crewService = {
  getAllCrews: async () => {
    const response = await axiosClient.get("/api/crews");
    return response.data;
  },
  createCrew: async (crewData) => {
    const response = await axiosClient.post("/api/crews", crewData);
    return response.data;
  },
  uploadImage: async (formData) => {
    const response = await axiosClient.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  getCrew: async (id) => {
    const response = await axiosClient.get(`/api/crews/${id}`);
    return response.data;
  },
  updateCrew: async (id, crewData) => {
    const response = await axiosClient.put(`/api/crews/${id}`, crewData);
    return response.data;
  },
  getMembers: async (id) => {
    const response = await axiosClient.get(`/api/crews/${id}/members`);
    return response.data;
  },
  joinCrew: async (id) => {
    const response = await axiosClient.post(`/api/crews/${id}/members`, {});
    return response.data;
  },
  updateMemberRole: async (id, userId, role) => {
    const response = await axiosClient.put(`/api/crews/${id}/members/${userId}`, { role });
    return response.data;
  },
  removeMember: async (id, userId) => {
    const response = await axiosClient.delete(`/api/crews/${id}/members/${userId}`);
    return response.data;
  },
  getEvents: async (id) => {
    const response = await axiosClient.get(`/api/crews/${id}/events`);
    return response.data;
  },
  createEvent: async (id, eventData) => {
    const response = await axiosClient.post(`/api/crews/${id}/events`, eventData);
    return response.data;
  },
  getEventRsvps: async (eventId) => {
    const response = await axiosClient.get(`/api/events/${eventId}/rsvps`);
    return response.data;
  },
  rsvpEvent: async (eventId, status) => {
    const response = await axiosClient.post(`/api/events/${eventId}/rsvp`, {
      status,
    });
    return response.data;
  },
  updateEvent: async (eventId, eventData) => {
    const response = await axiosClient.put(`/api/events/${eventId}`, eventData);
    return response.data;
  },
  deleteEvent: async (eventId) => {
    const response = await axiosClient.delete(`/api/events/${eventId}`);
    return response.data;
  },
  deleteCrew: async (id) => {
    const response = await axiosClient.delete(`/api/crews/${id}`);
    return response.data;
  },
};
