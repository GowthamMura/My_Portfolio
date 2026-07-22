export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 text-sm text-slate-500 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Gowtham. All rights reserved.</p>
        <p className="text-xs">
          Built with React + Tailwind + Node + MongoDB
        </p>
      </div>
    </footer>
  );
}

