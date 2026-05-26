import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { formatPrice, calculateSubtotal } from "../helpers/priceHelper.js";


function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    total,
    count,
  } = useCart();
 
 

  return (
    <div>
      <h1>Cart</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>

          <p>{item.price} €</p>

          <div className="quantity-controls">
            <button onClick={() => decreaseQuantity(item.id)} disabled={item.quantity === 1}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item.id)}>+</button>
          </div>

          <p>
            {item.quantity} × {item.price} €
          </p>

          <p>
            Subtotal:{" "}
            <strong>{formatPrice(calculateSubtotal(item))} €</strong>
          </p>

          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <h2>Total: {formatPrice(total)} €</h2>

      <Link to="/checkout">
        <button>Go to Checkout</button>
      </Link>
    </div>
  );
}

export default Cart;
