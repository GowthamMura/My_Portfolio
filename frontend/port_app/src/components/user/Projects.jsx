import { useEffect, useMemo, useState } from "react";
import { fetchProjects } from "../../api/projectApi.js";
import Loader from "../common/Loader.jsx";

const categories = ["All", "MERN", "AI", "Data Analytics", "Other"];

export default function Projects({ limit }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);

  const effectiveLimit = useMemo(() => limit || 6, [limit]);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await fetchProjects({
        category,
        search,
        page,
        limit: effectiveLimit,
      });
      setItems(data.data || []);
      setPagination(data.pagination);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, page, effectiveLimit]);

  return (
    <section id="projects" className="py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Projects</h2>
            <p className="mt-2 text-sm text-slate-500">Filter and search (from database).</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPage(1);
              load();
            }}
            className="flex gap-2"
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm w-56"
            />
            <button
              type="submit"
              className="h-10 px-4 rounded-lg bg-indigo-600 text-white text-sm font-semibold"
            >
              Search
            </button>
          </form>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCategory(c);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                category === c
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((p) => (
                <article
                  key={p._id}
                  className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
                >
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.title} className="h-40 w-full object-cover" />
                  ) : (
                    <div className="h-40 w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800" />
                  )}
                  <div className="p-4">
                    <div className="text-xs text-slate-500">{p.category}</div>
                    <h3 className="mt-1 font-bold">{p.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                      {p.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {(p.techStack || []).slice(0, 6).map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2 py-1 rounded-full bg-indigo-50 dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-3 text-xs font-semibold">
                      {p.githubUrl && (
                        <a className="text-indigo-600 hover:underline" href={p.githubUrl} target="_blank" rel="noreferrer">
                          GitHub
                        </a>
                      )}
                      {p.liveUrl && (
                        <a className="text-indigo-600 hover:underline" href={p.liveUrl} target="_blank" rel="noreferrer">
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {pagination?.pages > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    className={`px-3 py-1.5 rounded-lg text-sm border ${
                      page === n
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            )}

            {!items.length && (
              <div className="mt-8 text-sm text-slate-500">
                No projects found. Add some from Admin → Projects.
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

