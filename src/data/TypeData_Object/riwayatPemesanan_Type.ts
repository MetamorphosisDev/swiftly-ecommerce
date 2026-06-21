import type { CartItem } from "./CartItem_Type";

export interface RiwayatType {
    id: string;
    items: CartItem[];
    totalPrice: number;
    purchaseDate: string;
    status: "pending" | "paid" | "failed" | "cancelled";
}