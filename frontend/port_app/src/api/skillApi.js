import axiosClient from "./axiosClient";

export const fetchSkills = (params) => axiosClient.get("/skills", { params });
export const createSkill = (payload) => axiosClient.post("/skills", payload);
export const updateSkill = (id, payload) => axiosClient.put(`/skills/${id}`, payload);
export const deleteSkill = (id) => axiosClient.delete(`/skills/${id}`);

