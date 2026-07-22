import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createSkill, deleteSkill, fetchSkills, updateSkill } from "../../api/skillApi.js";
import Loader from "../../components/common/Loader.jsx";
import SkillsTable from "../../components/admin/SkillsTable.jsx";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", category: "General", level: 70 });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await fetchSkills({ limit: 200 });
      setSkills(data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name) {
      toast.error("Skill name is required");
      return;
    }
    try {
      if (editing) {
        await updateSkill(editing._id, form);
        toast.success("Skill updated");
      } else {
        await createSkill(form);
        toast.success("Skill created");
      }
      setEditing(null);
      setForm({ name: "", category: "General", level: 70 });
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save skill");
    }
  };

  const onDelete = async (s) => {
    if (!window.confirm(`Delete "${s.name}"?`)) return;
    try {
      await deleteSkill(s._id);
      toast.success("Skill deleted");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete skill");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="text-lg font-extrabold">Skills</div>
        <div className="text-sm text-slate-500">Quick add/edit skills with progress levels.</div>
      </div>

      <form
        onSubmit={submit}
        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 grid md:grid-cols-4 gap-3"
      >
        <div className="md:col-span-2">
          <label className="text-xs text-slate-500">Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500">Category</label>
          <input
            value={form.category}
            onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
            className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500">Level (0-100)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={form.level}
            onChange={(e) => setForm((p) => ({ ...p, level: Number(e.target.value) }))}
            className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
          />
        </div>
        <div className="md:col-span-4 flex gap-2 justify-end">
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm({ name: "", category: "General", level: 70 });
              }}
              className="h-10 px-4 rounded-lg border border-slate-200 dark:border-slate-800 font-semibold"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="h-10 px-4 rounded-lg bg-indigo-600 text-white font-semibold">
            {editing ? "Update" : "Add"}
          </button>
        </div>
      </form>

      {loading ? (
        <Loader />
      ) : (
        <SkillsTable
          skills={skills}
          onEdit={(s) => {
            setEditing(s);
            setForm({ name: s.name, category: s.category, level: s.level });
          }}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}

