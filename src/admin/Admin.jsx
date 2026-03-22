import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom"

function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
  async function init() {

    const { data } = await supabase.auth.getUser()

    if (!data.user) {
      navigate("/login")
      return // ❗ СПИРА execution-а
    }

    // 👉 само ако е логнат
    const { data: ordersData, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setOrders(ordersData)
    }

    setLoading(false)
  }

  init()
}, [navigate])

  async function updateStatus(id) {
    setUpdatingId(id);

    const { error } = await supabase
      .from("orders")
      .update({ status: "completed" })
      .eq("id", id);

    if (!error) {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: "completed" } : order,
        ),
      );
    }

    setUpdatingId(null);
  }

  if (loading) return <p>Loading orders...</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <h3>{order.customer_name}</h3>

          <p>📞 {order.phone}</p>
          <p>📍 {order.address}</p>

          <p>💰 {order.total} €</p>

          <p>
            Status:{" "}
            <span className={order.status === "completed" ? "done" : "pending"}>
              {order.status}
            </span>
          </p>

          {order.status !== "completed" && (
            <button onClick={() => updateStatus(order.id)}>
              {updatingId === order.id ? "Updating..." : "Mark as completed"}
            </button>
          )}

          <h4>Items:</h4>

          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Admin;
