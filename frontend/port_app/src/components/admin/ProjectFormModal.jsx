import { useEffect, useState } from "react";

const categories = ["MERN", "AI", "Data Analytics", "Other"];

export default function ProjectFormModal({ open, initial, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "MERN",
    techStack: "",
    githubUrl: "",
    liveUrl: "",
    isFeatured: false,
    image: null,
  });

  useEffect(() => {
    if (!open) return;
    setForm({
      title: initial?.title || "",
      description: initial?.description || "",
      category: initial?.category || "MERN",
      techStack: (initial?.techStack || []).join(", "),
      githubUrl: initial?.githubUrl || "",
      liveUrl: initial?.liveUrl || "",
      isFeatured: Boolean(initial?.isFeatured),
      image: null,
    });
  }, [open, initial]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-lg font-extrabold">{initial ? "Edit Project" : "Add Project"}</div>
            <div className="text-xs text-slate-500">Uploads support Cloudinary or local `/uploads`.</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            Close
          </button>
        </div>

        <form
          className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
        >
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Description *</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Tech Stack *</label>
            <input
              value={form.techStack}
              onChange={(e) => setForm((p) => ({ ...p, techStack: e.target.value }))}
              placeholder="React, Node, MongoDB"
              className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">GitHub URL</label>
            <input
              value={form.githubUrl}
              onChange={(e) => setForm((p) => ({ ...p, githubUrl: e.target.value }))}
              className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Live URL</label>
            <input
              value={form.liveUrl}
              onChange={(e) => setForm((p) => ({ ...p, liveUrl: e.target.value }))}
              className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm((p) => ({ ...p, image: e.target.files?.[0] || null }))}
              className="mt-1 w-full text-sm"
            />
          </div>
          <div className="flex items-end gap-2">
            <input
              id="featured"
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm((p) => ({ ...p, isFeatured: e.target.checked }))}
            />
            <label htmlFor="featured" className="text-sm">
              Featured
            </label>
          </div>

          <div className="md:col-span-2 flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-11 px-5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 font-semibold"
            >
              Cancel
            </button>
            <button type="submit" className="h-11 px-5 rounded-lg bg-indigo-600 text-white font-semibold">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

