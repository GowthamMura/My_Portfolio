import { NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle.jsx";

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg text-sm font-medium ${
    isActive
      ? "bg-indigo-600 text-white"
      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
  }`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="font-extrabold tracking-tight">
          Gowtham<span className="text-indigo-600">.</span>
        </NavLink>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/projects" className={linkClass}>
            Projects
          </NavLink>
          <NavLink to="/blogs" className={linkClass}>
            Blogs
          </NavLink>
          <NavLink to="/admin" className={linkClass}>
            Admin
          </NavLink>
          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
}

