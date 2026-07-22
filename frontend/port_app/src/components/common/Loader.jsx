export default function Loader({ label = "Loading..." }) {
  return (
    <div className="w-full py-10 flex items-center justify-center gap-3 text-sm text-slate-500">
      <span className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      <span>{label}</span>
    </div>
  );
}

