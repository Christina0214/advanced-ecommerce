import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export default function Navbar() {
  const items = useSelector(
    (state: RootState) => state.cart.items
  );

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        MyStore
      </Link>

      <Link to="/cart">
        Shopping Cart ({totalItems})
      </Link>
    </nav>
  );
}