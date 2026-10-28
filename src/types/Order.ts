import type { CartItem } from "./Products.ts";
import type { Timestamp } from "firebase/firestore";

export interface Order {
    id: string;
    userId: string;
    userEmail: string | null;
    items: CartItem[];
    totalPrice: number;
    createdAt: Timestamp | null;
}