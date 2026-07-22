import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { changePassword, getProfile, updateProfile } from "../../api/adminApi.js";

export default function ProfileSettings() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ name: "", title: "", bio: "", avatarUrl: "" });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const { data } = await getProfile();
        setProfile({
          name: data.name || "",
          title: data.title || "",
          bio: data.bio || "",
          avatarUrl: data.avatarUrl || "",
        });
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profile);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    try {
      await changePassword(passwords);
      toast.success("Password updated");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to change password");
    }
  };

  if (loading) {
    return <div className="text-sm text-slate-500">Loading profile...</div>;
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <form
        onSubmit={saveProfile}
        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 space-y-3"
      >
        <div className="text-lg font-extrabold">Profile</div>
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            value={profile.name}
            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
            className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Title</label>
          <input
            value={profile.title}
            onChange={(e) => setProfile((p) => ({ ...p, title: e.target.value }))}
            className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Avatar URL</label>
          <input
            value={profile.avatarUrl}
            onChange={(e) => setProfile((p) => ({ ...p, avatarUrl: e.target.value }))}
            className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Bio</label>
          <textarea
            rows={5}
            value={profile.bio}
            onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
            className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
          />
        </div>
        <button type="submit" className="h-11 px-5 rounded-lg bg-indigo-600 text-white font-semibold">
          Save Profile
        </button>
      </form>

      <form
        onSubmit={savePassword}
        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 space-y-3"
      >
        <div className="text-lg font-extrabold">Change Password</div>
        <div>
          <label className="text-sm font-medium">Current Password</label>
          <input
            type="password"
            value={passwords.currentPassword}
            onChange={(e) => setPasswords((p) => ({ ...p, currentPassword: e.target.value }))}
            className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium">New Password</label>
          <input
            type="password"
            value={passwords.newPassword}
            onChange={(e) => setPasswords((p) => ({ ...p, newPassword: e.target.value }))}
            className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
          />
        </div>
        <button type="submit" className="h-11 px-5 rounded-lg bg-indigo-600 text-white font-semibold">
          Update Password
        </button>
        <p className="text-xs text-slate-500">Minimum 6 characters (backend validation).</p>
      </form>
    </div>
  );
}

