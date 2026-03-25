import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const { count } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }

    getUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/shop");
  }

  return (
    <>
      <nav>
        <h2>Herbal Shop</h2>

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
