import axiosClient from "./axiosClient";

export const logService = {
  getGlobalLogs: async (params = {}) => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        if (user && user.id) params.viewer_id = user.id;
      } catch (e) {}
    }
    const response = await axiosClient.get("/api/logs", { params });
    return response.data;
  },
  getLog: async (id) => {
    const response = await axiosClient.get(`/api/logs/${id}`);
    return response.data;
  },
  getCrewLogs: async (crewId) => {
    const response = await axiosClient.get(`/api/crews/${crewId}/logs`);
    return response.data;
  },
  createGlobalLog: async (logData) => {
    const response = await axiosClient.post(`/api/logs`, logData);
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
  flagLog: async (id) => {
    const response = await axiosClient.post(`/api/logs/${id}/flag`);
    return response.data;
  },
  addComment: async (id, commentData) => {
    const response = await axiosClient.post(`/api/logs/${id}/comments`, commentData);
    return response.data;
  },
  likeLog: async (id) => {
    const response = await axiosClient.post(`/api/logs/${id}/like`);
    return response.data;
  },
  getComments: async (id) => {
    const response = await axiosClient.get(`/api/logs/${id}/comments`);
    return response.data;
  },
  flagComment: async (commentId) => {
    const response = await axiosClient.post(`/api/logs/comments/${commentId}/flag`);
    return response.data;
  },
};
