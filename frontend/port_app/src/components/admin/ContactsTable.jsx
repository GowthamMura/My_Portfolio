export default function ContactsTable({ messages, onToggleRead, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-900/40">
          <tr>
            <th className="text-left px-4 py-3">From</th>
            <th className="text-left px-4 py-3">Subject</th>
            <th className="text-left px-4 py-3">Status</th>
            <th className="text-left px-4 py-3">Date</th>
            <th className="text-right px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((m) => (
            <tr key={m._id} className="border-t border-slate-200/60 dark:border-slate-800/60">
              <td className="px-4 py-3">
                <div className="font-medium">{m.name}</div>
                <div className="text-xs text-slate-500">{m.email}</div>
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                <div className="font-medium">{m.subject || "-"}</div>
                <div className="text-xs text-slate-500 line-clamp-3">{m.message}</div>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    m.isRead
                      ? "bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300"
                      : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                  }`}
                >
                  {m.isRead ? "Read" : "Unread"}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-500">
                {new Date(m.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right space-x-2">
                <button
                  type="button"
                  onClick={() => onToggleRead(m)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  Toggle Read
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(m)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {!messages.length && (
            <tr>
              <td className="px-4 py-10 text-center text-slate-500" colSpan={5}>
                No messages yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

