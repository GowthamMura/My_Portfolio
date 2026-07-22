import { useEffect, useState } from "react";
import { fetchStats } from "../../api/adminApi.js";
import Loader from "../common/Loader.jsx";

export default function DashboardStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const run = async () => {
      const { data } = await fetchStats();
      setStats(data);
    };
    run();
  }, []);

  if (!stats) return <Loader label="Loading dashboard..." />;

  const cards = [
    { label: "Total Projects", value: stats.projectsCount, tone: "from-indigo-500 to-indigo-700" },
    { label: "Total Blogs", value: stats.blogsCount, tone: "from-emerald-500 to-emerald-700" },
    { label: "Total Messages", value: stats.contactsCount, tone: "from-amber-500 to-amber-700" },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 flex items-center justify-between"
        >
          <div>
            <div className="text-xs text-slate-500">{c.label}</div>
            <div className="mt-1 text-3xl font-extrabold">{c.value}</div>
          </div>
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.tone}`} />
        </div>
      ))}
    </div>
  );
}

