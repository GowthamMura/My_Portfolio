import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPassword } from "../../api/authApi";

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [resetUrl, setResetUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);
    setResetUrl("");
    try {
      const { data } = await forgotPassword({ email });
      toast.success(data?.message || "Reset request sent");
      if (data?.resetUrl) setResetUrl(data.resetUrl);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to request reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6">
        <div className="text-xl font-extrabold tracking-tight">
          Forgot Password<span className="text-indigo-600">.</span>
        </div>
        <p className="mt-1 text-sm text-slate-500">Enter your admin email to generate a reset link.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate reset link"}
          </button>
        </form>

        {resetUrl && (
          <div className="mt-4 rounded-lg border border-indigo-100 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40 p-3 text-sm">
            <div className="font-semibold text-indigo-700 dark:text-indigo-300">Development reset link</div>
            <a href={resetUrl} className="mt-1 block break-all text-indigo-600 dark:text-indigo-300 underline">
              {resetUrl}
            </a>
          </div>
        )}

        <Link to="/admin/login" className="mt-4 inline-block text-sm font-medium text-indigo-600 dark:text-indigo-400">
          Back to login
        </Link>
      </div>
    </div>
  );
}
