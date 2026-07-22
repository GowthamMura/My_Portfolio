import { useEffect, useMemo, useState } from "react";
import { fetchBlogs } from "../../api/blogApi.js";
import Loader from "../common/Loader.jsx";

export default function Blogs({ limit }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const effectiveLimit = useMemo(() => limit || 6, [limit]);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const { data } = await fetchBlogs({ page: 1, limit: effectiveLimit });
        setItems(data.data || []);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [effectiveLimit]);

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Blog</h2>
          <p className="mt-2 text-sm text-slate-500">Published posts from the database.</p>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((b) => (
              <article
                key={b._id}
                className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
              >
                {b.coverImageUrl ? (
                  <img src={b.coverImageUrl} alt={b.title} className="h-40 w-full object-cover" />
                ) : (
                  <div className="h-40 w-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-900 dark:to-slate-800" />
                )}
                <div className="p-4">
                  <div className="text-xs text-slate-500">{new Date(b.publishedAt || b.createdAt).toLocaleDateString()}</div>
                  <h3 className="mt-1 font-bold">{b.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                    {b.excerpt || "Open the admin panel to edit blog excerpts/content."}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {(b.tags || []).slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
            {!items.length && (
              <div className="text-sm text-slate-500">
                No published blogs yet. Create and publish from Admin → Blogs.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

