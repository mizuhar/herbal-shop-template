import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        navigate("/login");
        return; // ❗ СПИРА execution-а
      }

      // 👉 само ако е логнат
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (ordersError) {
        console.error(ordersError);
      } else {
        setOrders(ordersData);
      }

      const { data: messagesData, error: messagesError } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (messagesError) {
        console.error(messagesError);
      } else {
        setMessages(messagesData);
      }

      setLoading(false);
    }

    init();
  }, [navigate]);

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
  async function deleteMessage(id) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmDelete) return;

    const { error } = await supabase.from("messages").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("Error deleting message");
    } else {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }
  }

  if (loading) return <p>Loading orders...</p>;

 return (
  <div className="admin-container">
    <h1>Admin Dashboard</h1>

    <div className="admin-grid">

      {/* 👉 ORDERS */}
      <div className="admin-orders">
        <h2>Orders</h2>

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

      {/* 👉 MESSAGES */}
      <div className="admin-messages">
        <h2>Messages</h2>

        {messages.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="message-card">
              <h3>{msg.name}</h3>
              <p>📧 {msg.email}</p>
              <p>💬 {msg.message}</p>
              <p>🕒 {new Date(msg.created_at).toLocaleString()}</p>

              <button onClick={() => deleteMessage(msg.id)}>
                Delete message
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  </div>
);
}

export default Admin;
