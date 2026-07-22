import { useState } from "react";
import toast from "react-hot-toast";
import { createContact } from "../../api/contactApi.js";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Name, email and message are required");
      return;
    }
    setLoading(true);
    try {
      await createContact(form);
      toast.success("Message sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Contact</h2>
        <p className="mt-2 text-sm text-slate-500">
          Messages are saved to MongoDB and visible in Admin → Messages.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Subject</label>
            <input
              name="subject"
              value={form.subject}
              onChange={onChange}
              className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Message *</label>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="h-11 px-5 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}

