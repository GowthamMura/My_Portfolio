import Blog from "../models/Blog.js";
import Contact from "../models/Contact.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
import { HttpError, pick, requireBodyFields } from "../utils/validateRequest.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const [projectsCount, blogsCount, contactsCount] = await Promise.all([
      Project.countDocuments(),
      Blog.countDocuments(),
      Contact.countDocuments(),
    ]);

    res.json({ projectsCount, blogsCount, contactsCount });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res, next) => {
  try {
    const updates = pick(req.body, ["name", "title", "bio", "avatarUrl"]);
    const user = await User.findById(req.user._id);
    if (!user) throw new HttpError(404, "User not found");

    Object.assign(user, updates);
    const saved = await user.save();

    res.json({
      _id: saved._id,
      name: saved.name,
      email: saved.email,
      role: saved.role,
      title: saved.title,
      bio: saved.bio,
      avatarUrl: saved.avatarUrl,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    requireBodyFields(req.body, ["currentPassword", "newPassword"]);
    const { currentPassword, newPassword } = req.body;

    if (String(newPassword).length < 6) {
      throw new HttpError(400, "New password must be at least 6 characters");
    }

    const user = await User.findById(req.user._id);
    if (!user) throw new HttpError(404, "User not found");

    const ok = await user.matchPassword(currentPassword);
    if (!ok) throw new HttpError(400, "Invalid current password");

    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    next(err);
  }
};

