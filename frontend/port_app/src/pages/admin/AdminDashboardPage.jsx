import DashboardStats from "../../components/admin/DashboardStats.jsx";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardStats />
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5">
        <div className="font-semibold">Quick tips</div>
        <ul className="mt-2 text-sm text-slate-600 dark:text-slate-300 list-disc pl-5 space-y-1">
          <li>Add projects with images (Cloudinary or local uploads).</li>
          <li>Create blog drafts and publish when ready.</li>
          <li>Reply to contact messages and mark read/unread.</li>
        </ul>
      </div>
    </div>
  );
}

