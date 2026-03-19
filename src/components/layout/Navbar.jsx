import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const { count } = useCart();

  return (
    <nav>
      <Link to="/">Home</Link>

      <Link to="/shop">Shop</Link>

      <Link to="/about">About</Link>

      <Link to="/contact">Contact</Link>

      <Link to="/cart" className="cart-link">
        Cart <span className="badge">{count}</span>
      </Link>
      
      <Link to="/admin">Admin</Link>
    </nav>
  );
}
