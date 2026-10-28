import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { db } from "../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import type { Product } from "../types/Products.ts";

// 1. Define the props interface here
interface AddProductProps {
  onProductAdded: () => void;
}

const AddProduct = ({ onProductAdded }: AddProductProps) => {
  const [product, setProduct] = useState<Omit<Product, "id">>({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleSubmit = async (
    e: SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "products"), product);

      onProductAdded();

      alert("Product added!");

      setProduct({
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  
    return (
    <div className="add-product-section">
        <h3>Add a New Product</h3>

        <form className="add-product-form" onSubmit={handleSubmit}>
        <input
            className="product-input"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Product name"
        />

        <div className="price-input">
            <span>$</span>
            <input
                type="number"
                name="price"
                value={product.price === 0 ? "" : product.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="0"
                step="0.01"
                required
            />
        </div>

        <textarea
            className="product-textarea"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
        />

        <input
            className="product-input"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
        />

        <input
            className="product-input"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
        />

        <button className="add-product-button" type="submit">
            Add Product
        </button>
        </form>
    </div>
    );

};

export default AddProduct;