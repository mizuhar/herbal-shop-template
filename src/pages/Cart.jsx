import { useCart } from "../context/CartContext"

function Cart() {

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    total,
    count
  } = useCart()

  return (
    <div>

      <h1>Cart</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map(item => (
        <div key={item.id}>

          <h3>{item.name}</h3>

          <p>{item.price} €</p>

          <div>
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item.id)}>+</button>
          </div>

          <p>Subtotal: {item.price * item.quantity} €</p>

          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>

        </div>
      ))}

      <h2>Total: {total.toFixed(2)} €</h2>

    </div>
  )
}

export default Cart