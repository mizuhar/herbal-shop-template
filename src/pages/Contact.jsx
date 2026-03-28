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
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

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
    } else {
      setSuccess(true);
      setForm({ name: "", email: "", message: "" }); // reset
    }

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
            <p>📍 Sofia, Bulgaria</p>
            <p>📞 +359 888 123 456</p>
            <p>📧 mizuhar@abv.bg</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <textarea
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
