import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setOrders(data);
      }

      setLoading(false);
    }

    fetchOrders();
  }, []);

  async function updateStatus(id) {
    await supabase.from("orders").update({ status: "completed" }).eq("id", id);

    location.reload();
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
              Mark as completed
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
