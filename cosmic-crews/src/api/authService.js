import axiosClient from "./axiosClient";

export const authService = {
  register: async (userData) => {
    const response = await axiosClient.post("/api/auth/register", userData);
    return response.data;
  },
  login: async (credentials) => {
    const response = await axiosClient.post("/api/auth/login", credentials);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await axiosClient.get("/api/users/me");
    return response.data;
  },
  updateProfile: async (profileData) => {
    const response = await axiosClient.put("/api/users/me", profileData);
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
};
