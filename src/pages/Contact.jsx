export default function Contact() {
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
            <p>📧 herbalshop@email.com</p>
          </div>

          <form className="contact-form">
            <input placeholder="Your Name" required />
            <input placeholder="Email" required />
            <textarea placeholder="Message" rows="5" required />

            <button>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}