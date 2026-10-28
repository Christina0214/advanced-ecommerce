import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import { addToCart } from "../redux/cartSlice";
import type { Product } from "../types/Products";

// Mock Redux's useDispatch so we can check what gets dispatched
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

const mockDispatch = jest.fn();

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

describe("ProductCard", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        jest.mocked(useDispatch).mockReturnValue(
            mockDispatch as unknown as ReturnType<typeof useDispatch>
        );
    });

  test("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("A product for testing")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
    expect(screen.getByText(/4.5/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add to Cart" }))
      .toBeInTheDocument();
  });

  test("dispatches addToCart when the button is clicked", () => {
    render(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole("button", {
      name: "Add to Cart",
    });

    fireEvent.click(addButton);

    expect(mockDispatch).toHaveBeenCalledWith(addToCart(mockProduct));
  });
});
