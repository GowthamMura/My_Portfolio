import axiosClient from "./axiosClient";

export const fetchProjects = (params) => axiosClient.get("/projects", { params });
export const fetchProject = (id) => axiosClient.get(`/projects/${id}`);

export const createProject = (formData) =>
  axiosClient.post("/projects", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateProject = (id, formData) =>
  axiosClient.put(`/projects/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteProject = (id) => axiosClient.delete(`/projects/${id}`);

