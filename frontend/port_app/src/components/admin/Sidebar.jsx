import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const itemClass = ({ isActive }) =>
  `block px-4 py-2 rounded-lg text-sm font-medium ${
    isActive
      ? "bg-indigo-600 text-white"
      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
  }`;

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 hidden md:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
      <div className="mb-6">
        <div className="font-extrabold text-lg">
          Admin<span className="text-indigo-600">.</span>
        </div>
        <div className="text-xs text-slate-500">Manage your portfolio content</div>
      </div>

      <nav className="space-y-1 flex-1">
        <NavLink to="/admin" className={itemClass} end>
          Dashboard
        </NavLink>
        <NavLink to="/admin/projects" className={itemClass}>
          Projects
        </NavLink>
        <NavLink to="/admin/skills" className={itemClass}>
          Skills
        </NavLink>
        <NavLink to="/admin/blogs" className={itemClass}>
          Blogs
        </NavLink>
        <NavLink to="/admin/contacts" className={itemClass}>
          Messages
        </NavLink>
        <NavLink to="/admin/profile" className={itemClass}>
          Profile
        </NavLink>
      </nav>

      <button
        onClick={logout}
        className="mt-4 px-4 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
        type="button"
      >
        Logout
      </button>
    </aside>
  );
}

