import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/common/Loader.jsx";
import BlogsTable from "../../components/admin/BlogsTable.jsx";
import { adminListBlogs, createBlog, deleteBlog, updateBlog } from "../../api/blogApi.js";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    tags: "",
    published: false,
    content: "",
    cover: null,
  });

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await adminListBlogs({ page: 1, limit: 50 });
      setBlogs(data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: "", excerpt: "", tags: "", published: false, content: "", cover: null });
    setOpen(true);
  };

  const openEdit = (b) => {
    setEditing(b);
    setForm({
      title: b.title || "",
      excerpt: b.excerpt || "",
      tags: (b.tags || []).join(", "),
      published: Boolean(b.published),
      content: b.content || "",
      cover: null,
    });
    setOpen(true);
  };

  const save = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      toast.error("Title and content are required");
      return;
    }
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("excerpt", form.excerpt);
      fd.append("tags", form.tags);
      fd.append("published", String(form.published));
      fd.append("content", form.content);
      if (form.cover) fd.append("cover", form.cover);

      if (editing) {
        await updateBlog(editing._id, fd);
        toast.success("Blog updated");
      } else {
        await createBlog(fd);
        toast.success("Blog created");
      }
      setOpen(false);
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save blog");
    }
  };

  const remove = async (b) => {
    if (!window.confirm(`Delete "${b.title}"?`)) return;
    try {
      await deleteBlog(b._id);
      toast.success("Blog deleted");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete blog");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-lg font-extrabold">Blogs</div>
          <div className="text-sm text-slate-500">Create drafts and publish when ready.</div>
        </div>
        <button type="button" onClick={openCreate} className="h-10 px-4 rounded-lg bg-indigo-600 text-white font-semibold">
          Add Blog
        </button>
      </div>

      {loading ? <Loader /> : <BlogsTable blogs={blogs} onEdit={openEdit} onDelete={remove} />}

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="w-full max-w-3xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-extrabold">{editing ? "Edit Blog" : "Add Blog"}</div>
                <div className="text-xs text-slate-500">Cover image field name: <code>cover</code></div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setEditing(null);
                }}
                className="px-3 py-1.5 rounded-lg text-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                Close
              </button>
            </div>

            <form onSubmit={save} className="mt-5 space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Title *</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                    className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Tags</label>
                  <input
                    value={form.tags}
                    onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
                    placeholder="react, node, mongodb"
                    className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Excerpt</label>
                <input
                  value={form.excerpt}
                  onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
                  className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Content *</label>
                <textarea
                  rows={8}
                  value={form.content}
                  onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <input
                    id="published"
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
                  />
                  <label htmlFor="published" className="text-sm">
                    Published
                  </label>
                </div>
                <div>
                  <input type="file" accept="image/*" onChange={(e) => setForm((p) => ({ ...p, cover: e.target.files?.[0] || null }))} />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setEditing(null);
                  }}
                  className="h-11 px-5 rounded-lg border border-slate-200 dark:border-slate-800 font-semibold"
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
      )}
    </div>
  );
}

