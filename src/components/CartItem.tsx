import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "../redux/cartSlice";

import type { AppDispatch } from "../redux/store";
import type { CartItem as CartProduct } from "../types/product";

interface Props {
  item: CartProduct;
}

export default function CartItem({ item }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="cart-item">
      <img
        src={item.image}
        alt={item.title}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "https://placehold.co/100x100?text=No+Image";
        }}
      />

      <div>
        <h3>{item.title}</h3>

        <p>Price: ${item.price.toFixed(2)}</p>

        <p>Quantity: {item.quantity}</p>

        <p>
          Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </p>

        <button
          onClick={() =>
            dispatch(
              updateQuantity({
                id: item.id,
                quantity: item.quantity - 1,
              })
            )
          }
        >
          -
        </button>

        <button
          onClick={() =>
            dispatch(
              updateQuantity({
                id: item.id,
                quantity: item.quantity + 1,
              })
            )
          }
        >
          +
        </button>

        <button
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          Remove
        </button>
      </div>
    </div>
  );
}