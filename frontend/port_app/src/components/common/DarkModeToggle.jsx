import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext.jsx";

export default function DarkModeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const Icon = theme === "dark" ? FiSun : FiMoon;

  return (
    <button
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 ${className}`}
      aria-label="Toggle theme"
      type="button"
    >
      <Icon />
    </button>
  );
}

