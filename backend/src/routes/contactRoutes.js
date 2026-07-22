import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createContactMessage,
  deleteContactMessage,
  getContactMessages,
  toggleContactRead,
} from "../controllers/contactController.js";

const router = express.Router();

// Public
router.post("/", createContactMessage);

// Admin
router.get("/", protect, getContactMessages);
router.patch("/:id/toggle-read", protect, toggleContactRead);
router.delete("/:id", protect, deleteContactMessage);

export default router;

