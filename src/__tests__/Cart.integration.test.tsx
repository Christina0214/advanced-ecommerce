import {
  jest,
  describe,
  test,
  expect,
} from "@jest/globals";

import "@testing-library/jest-dom/jest-globals";

import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import ProductCard from "../components/ProductCard";
import Cart from "../pages/Cart";

import cartReducer from "../redux/cartSlice";
import type { Product } from "../types/Products";

// Mock Firebase because this test does not need to connect to Firebase.
jest.mock("../config/firebaseConfig", () => ({
  auth: { currentUser: null },
  db: {},
}));

const mockProduct: Product = {
  id: "1",
  title: "Test Product",
  price: 29.99,
  category: "Electronics",
  description: "A product for testing",
  image: "https://example.com/product.jpg",
  rating: {
    rate: 4.5,
    count: 10,
  },
};

describe("Cart integration test", () => {
  test("adding a product updates the shopping cart", () => {
    // Create a real Redux store for this test.
    const testStore = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });

    // Render ProductCard and Cart with the same Redux store.
    render(
      <Provider store={testStore}>
        <>
          <ProductCard product={mockProduct} />
          <Cart />
        </>
      </Provider>
    );

    // Click the Add to Cart button.
    fireEvent.click(
      screen.getByRole("button", { name: "Add to Cart" })
    );

    // Check that Redux contains the product.
    const cartItems = testStore.getState().cart.items;

    expect(cartItems).toHaveLength(1);
    expect(cartItems[0].title).toBe("Test Product");
    expect(cartItems[0].quantity).toBe(1);

    // Check that the Cart component displays the updated cart.
    expect(screen.getByText("Quantity: 1")).toBeInTheDocument();
    expect(screen.getByText("Total Products: 1")).toBeInTheDocument();
    expect(screen.getByText("Total Price: $29.99")).toBeInTheDocument();
  });
});
