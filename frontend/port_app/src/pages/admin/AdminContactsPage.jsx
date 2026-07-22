import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/common/Loader.jsx";
import ContactsTable from "../../components/admin/ContactsTable.jsx";
import { deleteContact, fetchContacts, toggleRead } from "../../api/contactApi.js";

export default function AdminContactsPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await fetchContacts({ page: 1, limit: 50 });
      setMessages(data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onToggleRead = async (m) => {
    try {
      await toggleRead(m._id);
      toast.success("Updated");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    }
  };

  const onDelete = async (m) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteContact(m._id);
      toast.success("Deleted");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="text-lg font-extrabold">Messages</div>
        <div className="text-sm text-slate-500">View/delete contact submissions and mark read/unread.</div>
      </div>

      {loading ? <Loader /> : <ContactsTable messages={messages} onToggleRead={onToggleRead} onDelete={onDelete} />}
    </div>
  );
}

