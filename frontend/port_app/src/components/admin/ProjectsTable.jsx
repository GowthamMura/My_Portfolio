export default function ProjectsTable({ projects, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-900/40">
          <tr>
            <th className="text-left px-4 py-3">Title</th>
            <th className="text-left px-4 py-3">Category</th>
            <th className="text-left px-4 py-3">Tech</th>
            <th className="text-right px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p._id} className="border-t border-slate-200/60 dark:border-slate-800/60">
              <td className="px-4 py-3 font-medium">{p.title}</td>
              <td className="px-4 py-3 text-slate-500">{p.category}</td>
              <td className="px-4 py-3 text-slate-500">{(p.techStack || []).join(", ")}</td>
              <td className="px-4 py-3 text-right space-x-2">
                <button
                  type="button"
                  onClick={() => onEdit(p)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(p)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {!projects.length && (
            <tr>
              <td className="px-4 py-10 text-center text-slate-500" colSpan={4}>
                No projects yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

