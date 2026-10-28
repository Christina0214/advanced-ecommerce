import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import type { AppDispatch } from "../redux/store";
import type { Product } from "../types/Products";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "https://placehold.co/300x300?text=No+Image";
        }}
      />

      <h3>{product.title}</h3>

      <p className="category">{product.category}</p>

      <p>{product.description}</p>

      <h3>${product.price.toFixed(2)}</h3>

      <p>
        ⭐ {product.rating.rate} ({product.rating.count} reviews)
      </p>

      <button
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </button>
    </div>
  );
}