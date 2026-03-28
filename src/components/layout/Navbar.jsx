import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false)
  const { count } = useCart();
  const navigate = useNavigate();

 useEffect(() => {
  // първоначален user
  supabase.auth.getUser().then(({ data }) => {
    setUser(data.user)
  })

  // слушаме за промени (login/logout)
  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setUser(session?.user ?? null)
    }
  )

  // cleanup
  return () => {
    listener.subscription.unsubscribe()
  }
}, [])
  useEffect(() => {
  function handleScroll() {
    setScrolled(window.scrollY > 10);
  }

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/shop");
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <h2 className="logo">Herbal Shop</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart" className="cart-link">
            Cart
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>

          {user ? (
            <>
              <Link to="/admin">Admin</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
    </>
  );
}
