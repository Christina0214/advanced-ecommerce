import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

import { signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

interface NavbarProps {
  user: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  const items = useSelector(
    (state: RootState) => state.cart.items
  );

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        MyStore
      </Link>

      <Link to="/cart">
        Shopping Cart ({totalItems})
      </Link>

      {user ? (
        <>
          <span>Welcome, {user.email}</span>

          <Link to="/orders">My Orders</Link>
          <Link to="/add-product">Manage Products</Link>
          <Link to="/add-data">Add User</Link>
          <Link to="/display-data">Display Users Data</Link>

          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          
        </>
      )}
    </nav>
  );
}