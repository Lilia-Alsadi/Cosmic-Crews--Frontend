import axiosClient from "./axiosClient";

export const observationService = {
  getGlobalObservations: async (params = {}) => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        if (user && user.id) params.viewer_id = user.id;
      } catch (e) {}
    }
    const response = await axiosClient.get("/api/observations", { params });
    return response.data;
  },
  getObservation: async (id) => {
    const response = await axiosClient.get(`/api/observations/${id}`);
    return response.data;
  },
  getCrewObservations: async (crewId) => {
    const response = await axiosClient.get(`/api/crews/${crewId}/observations`);
    return response.data;
  },
  createObservation: async (logData) => {
    const response = await axiosClient.post(`/api/observations`, logData);
    return response.data;
  },
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await axiosClient.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  flagObservation: async (id) => {
    const response = await axiosClient.post(`/api/observations/${id}/flag`);
    return response.data;
  },
  addComment: async (id, commentData) => {
    const response = await axiosClient.post(`/api/observations/${id}/comments`, commentData);
    return response.data;
  },
  likeObservation: async (id) => {
    const response = await axiosClient.post(`/api/observations/${id}/like`);
    return response.data;
  },
  getComments: async (id) => {
    const response = await axiosClient.get(`/api/observations/${id}/comments`);
    return response.data;
  },
  flagComment: async (commentId) => {
    const response = await axiosClient.post(`/api/observations/comments/${commentId}/flag`);
    return response.data;
  },
};
