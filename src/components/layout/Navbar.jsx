import { Link } from "react-router-dom";

export default function Navbar() {

  return (

    <nav>

      <Link to="/">Home</Link>

      <Link to="/shop">Shop</Link>

      <Link to="/about">About</Link>

      <Link to="/contact">Contact</Link>

      <Link to="/cart">Cart</Link>

    </nav>

  );

}