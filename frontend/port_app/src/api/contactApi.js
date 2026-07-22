import axiosClient from "./axiosClient";

// Public
export const createContact = (payload) => axiosClient.post("/contacts", payload);

// Admin
export const fetchContacts = (params) => axiosClient.get("/contacts", { params });
export const toggleRead = (id) => axiosClient.patch(`/contacts/${id}/toggle-read`);
export const deleteContact = (id) => axiosClient.delete(`/contacts/${id}`);

