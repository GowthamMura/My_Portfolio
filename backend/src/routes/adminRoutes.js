import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  changePassword,
  getDashboardStats,
  getProfile,
  updateProfile,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", protect, getDashboardStats);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

export default router;

