import ProfileSettings from "../../components/admin/ProfileSettings.jsx";

export default function AdminProfilePage() {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-lg font-extrabold">Profile Settings</div>
        <div className="text-sm text-slate-500">Update admin profile and password.</div>
      </div>
      <ProfileSettings />
    </div>
  );
}

