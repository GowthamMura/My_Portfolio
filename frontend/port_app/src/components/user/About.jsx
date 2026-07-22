export default function About() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-8 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">About</h2>
          <p className="mt-2 text-sm text-slate-500">
            A short intro that you can later manage from Admin Profile.
          </p>
        </div>
        <div className="md:col-span-2">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6">
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
              I’m a full-stack developer focused on building clean, performant web experiences.
              I enjoy turning complex problems into simple, beautiful solutions — from database
              models to modern UI.
            </p>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {[
                { k: "Stack", v: "MERN" },
                { k: "Focus", v: "DX + UX" },
                { k: "Style", v: "Clean & scalable" },
              ].map((x) => (
                <div
                  key={x.k}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900"
                >
                  <div className="text-xs text-slate-500">{x.k}</div>
                  <div className="font-semibold">{x.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

