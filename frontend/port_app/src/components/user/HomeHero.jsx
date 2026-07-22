import { motion } from "framer-motion";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950" />
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,_#ffffff_1px,_transparent_0)] bg-[size:20px_20px]" />
      <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-20 text-white">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-[0.35em] text-white/80"
        >
          MERN Developer • Admin Dashboard • Dynamic Content
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          Hi, I'm <span className="text-yellow-300">Gowtham</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-2xl text-white/90"
        >
          I build modern, scalable web apps with React, Node.js, and MongoDB. This portfolio is
          fully dynamic — manage projects, blogs, skills, and messages from the admin dashboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-100"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full border border-white/60 text-white font-semibold hover:bg-white/10"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}

