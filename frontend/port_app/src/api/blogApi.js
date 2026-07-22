import axiosClient from "./axiosClient";

// Public
export const fetchBlogs = (params) => axiosClient.get("/blogs", { params });
export const fetchBlogBySlug = (slug) => axiosClient.get(`/blogs/slug/${slug}`);

// Admin
export const adminListBlogs = (params) => axiosClient.get("/blogs/admin/list", { params });

export const createBlog = (formData) =>
  axiosClient.post("/blogs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateBlog = (id, formData) =>
  axiosClient.put(`/blogs/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteBlog = (id) => axiosClient.delete(`/blogs/${id}`);

