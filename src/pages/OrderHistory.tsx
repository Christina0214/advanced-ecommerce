import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

import { auth, db } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import type { Order } from "../types/Order.ts";

import { Link } from "react-router-dom";

import "./Orders.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const user = auth.currentUser;

    if (!user) return;

    try {
      const ordersQuery = query(
        collection(db, "orders"),
        where("userId", "==", user.uid), //Retrieves only orders belonging to the logged-in user
        orderBy("createdAt", "desc") // Displays the newest orders first
      );

      const querySnapshot = await getDocs(ordersQuery);

      const ordersArray = querySnapshot.docs.map((document) => ({
        id: document.id, //Gives the unique order ID
        ...document.data(),
      })) as Order[];

      setOrders(ordersArray);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchOrders();
      } else {
        setOrders([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading your orders...</p>;
  }

  if (!auth.currentUser) {
    return <p>Please log in to see your order history.</p>;
  }

    return (
        <div className="orders-page">
            <h2>My Order History</h2>

            {orders.length === 0 ? (
                <p className="orders-empty">
                    You haven't placed any orders yet.
                </p>
            ) : (
                orders.map((order) => (
                    <div className="order-card" key={order.id}>
                        <h3>Order ID: {order.id}</h3>

                        <p>
                            Date:{" "}
                            {order.createdAt
                            ? order.createdAt.toDate().toLocaleDateString()
                            : "Date unavailable"}
                        </p>

                        <p>Total: ${order.totalPrice.toFixed(2)}</p>

                        <Link className="order-link" to={`/orders/${order.id}`}>
                            View Order Details
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderHistory;
