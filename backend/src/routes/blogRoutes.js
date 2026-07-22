import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
import {
  adminListBlogs,
  createBlog,
  deleteBlog,
  getBlogBySlug,
  getBlogs,
  updateBlog,
} from "../controllers/blogController.js";

const router = express.Router();

// Public
router.get("/", getBlogs);
router.get("/slug/:slug", getBlogBySlug);

// Admin
router.get("/admin/list", protect, adminListBlogs);
router.post("/", protect, upload.single("cover"), createBlog);
router.put("/:id", protect, upload.single("cover"), updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;

