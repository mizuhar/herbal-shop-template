export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h3>Herbal Shop 🌿</h3>
          <p>Natural products for your wellbeing.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/contact">Contact</a>
          <a href="/cart">Cart</a>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>📍 Sofia, Bulgaria</p>
          <p>📧 mizuhar@abv.bg</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Herbal Shop • Design by Vladislav Stanchev</p>
      </div>
    </footer>
  )
}