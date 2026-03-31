import { useState } from "react"
import { useCart } from "../context/CartContext"
import { supabase } from "../lib/supabase"


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

  const orderData = {
    customer_name: form.name,
    phone: form.phone,
    address: form.address,
    items: cart,
    total: total
  }

  const { error } = await supabase.from("orders").insert([orderData])

  if (error) {
    console.error(error)
    alert("Error placing order")
    setLoading(false)
    return
  }

  // 🔥 ТУК Е МАГИЯТА (липсваше ти)
  try {
    const { data, error: emailError } = await supabase.functions.invoke("resend-email", {
      body: {
        type: "order",
        order: orderData
      }
    })

    console.log("EMAIL RESPONSE:", data, emailError)
  } catch (err) {
    console.error("Email error:", err)
  }

  clearCart()
  setSuccess(true)
  setLoading(false)
}
   

if (success) {
  return (
    <div className="success">
      <h2>✅ Order placed successfully!</h2>
      <p>We will contact you shortly.</p>
    </div>
  )
}


  return (
    <div>

      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>

        <input
          disabled={loading}
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          required
        />

        <input
          disabled={loading}
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />

        <textarea
          disabled={loading}
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