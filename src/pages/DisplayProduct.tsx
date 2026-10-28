import { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig.ts";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import type { Product } from "../types/Products.ts";
import AddProduct from "./AddProduct.tsx";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "products")
      );

      const productsArray = querySnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      })) as Product[];

      setProducts(productsArray);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Update a product
  const updateProduct = async (
    productId: string,
    updatedData: Partial<Omit<Product, "id">>
  ) => {
    try {
      const productDoc = doc(db, "products", productId);

      await updateDoc(productDoc, updatedData);

      await fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Delete a product
  const deleteProduct = async (productId: string) => {
    try {
      const productDoc = doc(db, "products", productId);

      await deleteDoc(productDoc);

      await fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  
  return (
    <main className="products-page">
      <h2>Product Management</h2>

      <AddProduct onProductAdded={fetchProducts} />

      <h2>Our Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.title}</h3>

            <img
              className="product-image"
              src={product.image}
              alt={product.title}
            />

            <p className="product-price">
              ${product.price}
            </p>

            <p className="product-category">
              {product.category}
            </p>

            <p className="product-description">
              {product.description}
            </p>

            <div className="product-actions">
              <button
                className="update-button"
                onClick={() =>
                  updateProduct(product.id, {
                    price: product.price + 1,
                  })
                }
              >
                Increase price by $1
              </button>

              <button
                className="delete-button"
                onClick={() => deleteProduct(product.id)}
              >
                Delete Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Products;