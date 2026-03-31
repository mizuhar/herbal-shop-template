import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setSuccess(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

      if (!form.email.includes("@")) {
      alert("Invalid email");
      setLoading(false);
      return;
    }

    // 1. запис в базата
    const { error } = await supabase.from("messages").insert([
      {
        name: form.name,
        email: form.email,
        message: form.message,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Error sending message");
      setLoading(false);
      return;
    }

    // 2. пращане на email 🔥
  try {
  const { error } = await supabase.functions.invoke("resend-email", {
    body: {
      name: form.name,
      email: form.email,
      message: form.message,
    },
  });

  if (error) {
    console.error("Email failed:", error);
  }
} catch (err) {
  console.error("Email error:", err);
}
  
    // 3. success UI
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });

    setLoading(false);
  }

  return (
    <div className="container">
      <div className="contact">
        <h1>Contact Us</h1>

        <p>
          Have questions or want to place a custom order? Get in touch with us.
        </p>

        <div className="contact-grid">
          <div className="contact-info">
            <p>📍 Varna, Bulgaria</p>
            <p>📞 +359 888 123 456</p>
            <p>📧 ceco@abv.bg</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              disabled={loading}
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              disabled={loading}
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <textarea
              disabled={loading}
              name="message"
              placeholder="Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            />

            <button disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
            {success && <p style={{ color: "green" }}>Message sent ✅</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
