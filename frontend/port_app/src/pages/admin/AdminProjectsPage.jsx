import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createProject, deleteProject, fetchProjects, updateProject } from "../../api/projectApi.js";
import Loader from "../../components/common/Loader.jsx";
import ProjectFormModal from "../../components/admin/ProjectFormModal.jsx";
import ProjectsTable from "../../components/admin/ProjectsTable.jsx";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await fetchProjects({ page: 1, limit: 100 });
      setProjects(data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (form) => {
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("category", form.category);
      fd.append("techStack", form.techStack);
      fd.append("githubUrl", form.githubUrl);
      fd.append("liveUrl", form.liveUrl);
      fd.append("isFeatured", String(form.isFeatured));
      if (form.image) fd.append("image", form.image);

      if (editing) {
        await updateProject(editing._id, fd);
        toast.success("Project updated");
      } else {
        await createProject(fd);
        toast.success("Project created");
      }

      setOpen(false);
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save project");
    }
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`Delete "${p.title}"?`)) return;
    try {
      await deleteProject(p._id);
      toast.success("Project deleted");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete project");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-lg font-extrabold">Projects</div>
          <div className="text-sm text-slate-500">Create, update, delete projects.</div>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="h-10 px-4 rounded-lg bg-indigo-600 text-white font-semibold"
        >
          Add Project
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <ProjectsTable
          projects={projects}
          onEdit={(p) => {
            setEditing(p);
            setOpen(true);
          }}
          onDelete={handleDelete}
        />
      )}

      <ProjectFormModal
        open={open}
        initial={editing}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSave}
      />
    </div>
  );
}

