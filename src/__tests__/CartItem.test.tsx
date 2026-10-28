import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";

import CartItem from "../components/CartItem";
import {
  removeFromCart,
  updateQuantity,
} from "../redux/cartSlice";

import type { CartItem as CartProduct } from "../types/Products";

// Mock Redux dispatch
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

const mockDispatch = jest.fn();

const mockItem: CartProduct = {
  id: "1",
  title: "Test Product",
  price: 20,
  category: "Electronics",
  description: "A product for testing",
  image: "https://example.com/product.jpg",
  quantity: 2,
};

describe("CartItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useDispatch).mockReturnValue(
      mockDispatch as never
    );
  });

  test("renders product information and subtotal correctly", () => {
    render(<CartItem item={mockItem} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Price: $20.00")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
    expect(screen.getByText("Subtotal: $40.00")).toBeInTheDocument();
  });

  test("increases quantity when the plus button is clicked", () => {
    render(<CartItem item={mockItem} />);

    fireEvent.click(screen.getByRole("button", { name: "+" }));

    expect(mockDispatch).toHaveBeenCalledWith(
      updateQuantity({
        id: "1",
        quantity: 3,
      })
    );
  });

  test("removes the product when the Remove button is clicked", () => {
    render(<CartItem item={mockItem} />);

    fireEvent.click(screen.getByRole("button", { name: "Remove" }));

    expect(mockDispatch).toHaveBeenCalledWith(
      removeFromCart("1")
    );
  });
});