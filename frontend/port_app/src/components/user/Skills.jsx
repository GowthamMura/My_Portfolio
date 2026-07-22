import { useEffect, useState } from "react";
import { fetchSkills } from "../../api/skillApi.js";
import Loader from "../common/Loader.jsx";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const { data } = await fetchSkills({ limit: 100 });
        setSkills(data.data || []);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Skills</h2>
            <p className="mt-2 text-sm text-slate-500">Progress-style skills from the database.</p>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {skills.map((s) => (
              <div
                key={s._id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-xs text-slate-500">{s.level}%</div>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600"
                    style={{ width: `${Math.max(0, Math.min(100, s.level))}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-slate-500">{s.category}</div>
              </div>
            ))}
            {skills.length === 0 && (
              <div className="text-sm text-slate-500">
                No skills yet. Add them from Admin → Skills.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

