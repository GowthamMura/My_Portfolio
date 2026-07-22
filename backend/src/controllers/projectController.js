import Project from "../models/Project.js";
import cloudinary, { isCloudinaryConfigured } from "../config/cloudinary.js";
import { HttpError, parsePagination } from "../utils/validateRequest.js";

const normalizeTechStack = (techStack) => {
  if (Array.isArray(techStack)) return techStack.map((t) => String(t).trim()).filter(Boolean);
  if (typeof techStack === "string") {
    return techStack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
};

const fileToUrl = (req) => {
  if (!req.file) return "";
  const base = `${req.protocol}://${req.get("host")}`;
  return `${base}/uploads/${req.file.filename}`;
};

const uploadImageIfNeeded = async (req) => {
  if (!req.file) return "";
  if (isCloudinaryConfigured()) {
    const uploaded = await cloudinary.uploader.upload(req.file.path, {
      folder: "portfolio/projects",
    });
    return uploaded.secure_url;
  }
  return fileToUrl(req);
};

// Public: list with filter/search/pagination
export const getProjects = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req.query, { page: 1, limit: 6 });
    const { category, search } = req.query;

    const query = {};
    if (category && category !== "All") query.category = category;
    if (search) query.title = { $regex: String(search), $options: "i" };

    const [data, total] = await Promise.all([
      Project.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Project.countDocuments(query),
    ]);

    res.json({
      data,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) throw new HttpError(404, "Project not found");
    res.json(project);
  } catch (err) {
    next(err);
  }
};

// Admin: create/update/delete
export const createProject = async (req, res, next) => {
  try {
    const { title, description, category, githubUrl, liveUrl, isFeatured } = req.body;

    if (!title || !description) {
      throw new HttpError(400, "title and description are required");
    }

    const techStack = normalizeTechStack(req.body.techStack);
    if (!techStack.length) throw new HttpError(400, "techStack is required");

    const imageUrl = await uploadImageIfNeeded(req);

    const created = await Project.create({
      title,
      description,
      techStack,
      category,
      githubUrl,
      liveUrl,
      isFeatured: String(isFeatured).toLowerCase() === "true" || isFeatured === true,
      imageUrl,
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) throw new HttpError(404, "Project not found");

    const { title, description, category, githubUrl, liveUrl, isFeatured } = req.body;

    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (category !== undefined) project.category = category;
    if (githubUrl !== undefined) project.githubUrl = githubUrl;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    if (isFeatured !== undefined) {
      project.isFeatured = String(isFeatured).toLowerCase() === "true" || isFeatured === true;
    }
    if (req.body.techStack !== undefined) {
      const techStack = normalizeTechStack(req.body.techStack);
      if (!techStack.length) throw new HttpError(400, "techStack cannot be empty");
      project.techStack = techStack;
    }

    if (req.file) {
      project.imageUrl = await uploadImageIfNeeded(req);
    }

    const saved = await project.save();
    res.json(saved);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) throw new HttpError(404, "Project not found");
    await project.deleteOne();
    res.json({ message: "Project deleted" });
  } catch (err) {
    next(err);
  }
};

