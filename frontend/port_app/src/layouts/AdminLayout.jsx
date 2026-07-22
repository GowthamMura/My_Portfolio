import Sidebar from "../components/admin/Sidebar.jsx";
import DarkModeToggle from "../components/common/DarkModeToggle.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminLayout({ children }) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <header className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">Admin Dashboard</div>
            <div className="text-xs text-slate-500 truncate">{user?.email}</div>
          </div>
          <DarkModeToggle />
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

