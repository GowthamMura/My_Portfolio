export default function BlogsTable({ blogs, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-900/40">
          <tr>
            <th className="text-left px-4 py-3">Title</th>
            <th className="text-left px-4 py-3">Slug</th>
            <th className="text-left px-4 py-3">Published</th>
            <th className="text-right px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((b) => (
            <tr key={b._id} className="border-t border-slate-200/60 dark:border-slate-800/60">
              <td className="px-4 py-3 font-medium">{b.title}</td>
              <td className="px-4 py-3 text-slate-500">{b.slug}</td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    b.published
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300"
                  }`}
                >
                  {b.published ? "Yes" : "No"}
                </span>
              </td>
              <td className="px-4 py-3 text-right space-x-2">
                <button
                  type="button"
                  onClick={() => onEdit(b)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(b)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {!blogs.length && (
            <tr>
              <td className="px-4 py-10 text-center text-slate-500" colSpan={4}>
                No blogs yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

