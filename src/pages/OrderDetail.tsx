import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../config/firebaseConfig";
import type { Order } from "../types/Order.ts";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      const user = auth.currentUser;

      if (!user || !orderId) {
        setError("Please log in to view this order.");
        setLoading(false);
        return;
      }

      try {
        const orderRef = doc(db, "orders", orderId);
        const orderSnapshot = await getDoc(orderRef);

        if (!orderSnapshot.exists()) {
          setError("Order not found.");
          return;
        }

        const orderData = {
          id: orderSnapshot.id,
          ...orderSnapshot.data(),
        } as Order;

        // Make sure this order belongs to the logged-in user
        if (orderData.userId !== user.uid) {
          setError("You are not allowed to view this order.");
          return;
        }

        setOrder(orderData);
      } catch (error) {
        console.error("Error fetching order:", error);
        setError("Could not load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!order) {
    return <p>Order not found.</p>;
  }

  
  return (
    <div className="order-details-page">
      <h2>Order Details</h2>

      <div className="order-info">
        <h3>Order ID: {order.id}</h3>

        <p>
          Date:{" "}
          {order.createdAt
            ? order.createdAt.toDate().toLocaleDateString()
            : "Date unavailable"}
        </p>
      </div>

      <h3>Products</h3>

      {order.items.map((item) => (
        <div className="order-product" key={item.id}>
          <img src={item.image} alt={item.title} />

          <div className="order-product-info">
            <h4>{item.title}</h4>

            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <p>
              Subtotal: ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}

      <h3 className="order-total">
        Total: ${order.totalPrice.toFixed(2)}
      </h3>

      <Link className="back-to-orders" to="/orders">
        Back to Order History
      </Link>
    </div>
  );
};

export default OrderDetails;