import axiosClient from "./axiosClient";

export const fetchStats = () => axiosClient.get("/admin/stats");
export const getProfile = () => axiosClient.get("/admin/profile");
export const updateProfile = (payload) => axiosClient.put("/admin/profile", payload);
export const changePassword = (payload) => axiosClient.put("/admin/change-password", payload);

