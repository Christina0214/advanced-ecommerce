import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ProductCard from "../components/ProductCard";
import type { Product } from "../types/product";

const API_URL = "https://fakestoreapi.com";

async function fetchProducts(category: string): Promise<Product[]> {
  const url =
    category === "all"
      ? `${API_URL}/products`
      : `${API_URL}/products/category/${encodeURIComponent(category)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to load products");
  }

  return response.json();
}

async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${API_URL}/products/categories`);

  if (!response.ok) {
    throw new Error("Failed to load categories");
  }

  return response.json();
}

export default function Home() {
  const [category, setCategory] = useState("all");

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProducts(category),
  });

  const {
    data: categories,
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

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
        disabled={categoriesLoading}
      >
        <option value="all">All Categories</option>

        {categories?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <div className="product-grid">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}