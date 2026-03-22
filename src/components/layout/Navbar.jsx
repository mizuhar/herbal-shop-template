import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [user, setUser] = useState(null)
  const { count } = useCart();
  const navigate = useNavigate()

  useEffect(() => {
  async function getUser() {
    const { data } = await supabase.auth.getUser()
    setUser(data.user)
  }

  getUser()
}, [])

async function handleLogout() {
  await supabase.auth.signOut()
  setUser(null)
  navigate('/shop')
}

  return (
<>
    {user && <h1>Welcome</h1>}
    <nav>
      <Link to="/">Home</Link>

      <Link to="/shop">Shop</Link>

      <Link to="/about">About</Link>

      <Link to="/contact">Contact</Link>

      <Link to="/cart" className="cart-link">
        Cart <span className="badge">{count}</span>
      </Link>

      {user ? (
  <>
    <Link to="/admin">Admin</Link>
    <Link onClick={handleLogout}>Logout</Link>
  </>
) : (
  <Link to="/login">Login</Link>
)}
    </nav>

    </>
  );
}
