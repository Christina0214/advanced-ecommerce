import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import type { CartItem } from "../types/Products";

const loadCart = (): CartItem[] => {
  try {
    const savedCart = sessionStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) as CartItem[] : [];
  } catch {
    return [];
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: {
      items: loadCart(),
    },
  },
});

// Save cart changes to sessionStorage
store.subscribe(() => {
  const items = store.getState().cart.items;
  sessionStorage.setItem("cart", JSON.stringify(items));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;