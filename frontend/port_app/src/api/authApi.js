import axiosClient from "./axiosClient";

export const login = (payload) => axiosClient.post("/auth/login", payload);
export const register = (payload) => axiosClient.post("/auth/register", payload);
export const forgotPassword = (payload) => axiosClient.post("/auth/forgot-password", payload);
export const resetPassword = (token, payload) => axiosClient.post(`/auth/reset-password/${token}`, payload);
