import { useState } from "react"
import { useCart } from "../context/CartContext"
import { supabase } from "../lib/supabase"
import { useEffect } from "react"

function Checkout() {

  const { cart, total, clearCart } = useCart()

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: ""
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)

    const { error } = await supabase.from("orders").insert([
      {
        customer_name: form.name,
        phone: form.phone,
        address: form.address,
        items: cart,
        total: total
      }
    ])

 if (error) {
  console.error(error)
  alert("Error placing order")
} else {
  clearCart()      // 🔥 тук
  setSuccess(true)
}

    setLoading(false)
  }
   

if (success) {
  return <h2>Order successful! We will contact you.</h2>
}


  return (
    <div>

      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
        />

        <h3>Total: {total.toFixed(2)} €</h3>

        <button disabled={loading}>
          {loading ? "Processing..." : "Place Order"}
        </button>

      </form>

    </div>
  )
}

export default Checkout