import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../config/firebaseConfig";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Products.ts";

// Fetch products from Firestore
async function fetchProducts(): Promise<Product[]> {
  const querySnapshot = await getDocs(collection(db, "products"));

  const products = querySnapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  })) as Product[];

  return products;
}

export default function Home() {
  const [category, setCategory] = useState("all");

  // Get products using React Query
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Get unique categories from the products
  const categories = [
    ...new Set(products?.map((product) => product.category) ?? []),
  ];

  // Filter products by selected category
  const filteredProducts =
    category === "all"
      ? products
      : products?.filter((product) => product.category === category);

  if (isLoading) return <p>Loading products...</p>;

  if (isError) return <p>Something went wrong loading products.</p>;

  return (
    <div className="container">
      <h1>Our Products</h1>

      <label htmlFor="category">Filter by category: </label>

      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All Categories</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <div className="product-grid">
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}