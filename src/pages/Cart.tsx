import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { clearCart } from "../redux/cartSlice";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";
import type { RootState, AppDispatch } from "../redux/store";

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector(
    (state: RootState) => state.cart.items
  );

  const [message, setMessage] = useState("");

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (items.length === 0) return;

    const user = auth.currentUser;

    if (!user) {
      setMessage("Please log in before placing an order.");
      return;
    }

    try {
      const totalPrice = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        userEmail: user.email,
        items: items,
        totalPrice: totalPrice,
        createdAt: serverTimestamp(),
      });

      dispatch(clearCart());
      setMessage("Your order was completed successfully!");

    } catch (error) {
      console.error("Error placing order:", error);
      setMessage("Something went wrong. Your order was not completed.");
    }
  };

  return (
    <div className="container">
      <h1>Shopping Cart</h1>

      {message && (
        <p className="success-message" role="status">
          {message}
        </p>
      )}

      {items.length === 0 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <p>Total Products: {totalItems}</p>

            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>

            <button onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}