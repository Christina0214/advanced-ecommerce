import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "./config/firebaseConfig";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Products from "./pages/DisplayProduct";
import OrderHistory from "./pages/OrderHistory";
import OrderDetails from "./pages/OrderDetail";
import AddDataForm from "./pages/AddUserData";
import DisplayData from "./pages/DisplayUser";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-product" element={<Products />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/add-data" element={<AddDataForm />} />
        <Route path="/display-data" element={<DisplayData />} />
      </Routes>
    </div>
  );
};

export default App;