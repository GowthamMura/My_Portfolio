import Blog from "../models/Blog.js";
import cloudinary, { isCloudinaryConfigured } from "../config/cloudinary.js";
import { HttpError, parsePagination } from "../utils/validateRequest.js";

const fileToUrl = (req) => {
  if (!req.file) return "";
  const base = `${req.protocol}://${req.get("host")}`;
  return `${base}/uploads/${req.file.filename}`;
};

const uploadCoverIfNeeded = async (req) => {
  if (!req.file) return "";
  if (isCloudinaryConfigured()) {
    const uploaded = await cloudinary.uploader.upload(req.file.path, {
      folder: "portfolio/blogs",
    });
    return uploaded.secure_url;
  }
  return fileToUrl(req);
};

const slugify = (str) =>
  String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// Public: list published blogs
export const getBlogs = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req.query, { page: 1, limit: 6 });
    const { search, tag } = req.query;

    const query = { published: true };
    if (search) query.title = { $regex: String(search), $options: "i" };
    if (tag) query.tags = String(tag);

    const [data, total] = await Promise.all([
      Blog.find(query)
        .sort({ publishedAt: -1, createdAt: -1 })
        .select("-content")
        .skip(skip)
        .limit(limit),
      Blog.countDocuments(query),
    ]);

    res.json({
      data,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!blog) throw new HttpError(404, "Blog not found");
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

// Admin: CRUD (includes drafts)
export const adminListBlogs = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req.query, { page: 1, limit: 10 });
    const { search } = req.query;

    const query = {};
    if (search) query.title = { $regex: String(search), $options: "i" };

    const [data, total] = await Promise.all([
      Blog.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Blog.countDocuments(query),
    ]);

    res.json({
      data,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const { title, content, excerpt, tags, published } = req.body;
    if (!title || !content) throw new HttpError(400, "title and content are required");

    const slug = slugify(title);
    const exists = await Blog.findOne({ slug });
    if (exists) throw new HttpError(400, "A blog with this title/slug already exists");

    const coverImageUrl = await uploadCoverIfNeeded(req);

    const created = await Blog.create({
      title,
      slug,
      content,
      excerpt: excerpt || "",
      coverImageUrl,
      tags: Array.isArray(tags)
        ? tags.map((t) => String(t).trim()).filter(Boolean)
        : String(tags || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
      published: String(published).toLowerCase() === "true" || published === true,
      publishedAt:
        String(published).toLowerCase() === "true" || published === true ? new Date() : undefined,
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) throw new HttpError(404, "Blog not found");

    const { title, content, excerpt, tags, published } = req.body;

    if (title !== undefined && title !== blog.title) {
      const newSlug = slugify(title);
      const exists = await Blog.findOne({ slug: newSlug, _id: { $ne: blog._id } });
      if (exists) throw new HttpError(400, "Slug already in use");
      blog.title = title;
      blog.slug = newSlug;
    }

    if (content !== undefined) blog.content = content;
    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (tags !== undefined) {
      blog.tags = Array.isArray(tags)
        ? tags.map((t) => String(t).trim()).filter(Boolean)
        : String(tags || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
    }

    if (published !== undefined) {
      const nextPublished = String(published).toLowerCase() === "true" || published === true;
      if (nextPublished && !blog.published) blog.publishedAt = new Date();
      if (!nextPublished) blog.publishedAt = undefined;
      blog.published = nextPublished;
    }

    if (req.file) {
      blog.coverImageUrl = await uploadCoverIfNeeded(req);
    }

    const saved = await blog.save();
    res.json(saved);
  } catch (err) {
    next(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) throw new HttpError(404, "Blog not found");
    await blog.deleteOne();
    res.json({ message: "Blog deleted" });
  } catch (err) {
    next(err);
  }
};

