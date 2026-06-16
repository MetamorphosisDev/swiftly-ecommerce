import type { CartItem } from "../data/TypeData_Object/CartItem_Type";
// AddProduct
export function addToCart(product: CartItem): void {
    console.log("ADD TO CART DIPANGGIL:", product);

    const cart: CartItem[] = JSON.parse(
        localStorage.getItem("swiftly_cart") || "[]"
    );

    // Produk sama maka tambah quantity
    const existing = cart.find(item => String(item.id) === String(product.id))
    if (existing) {
        existing.quantity = (existing.quantity ?? 1) + 1
    } else {
        cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem("swiftly_cart", JSON.stringify(cart));

    console.log("ISI CART SEKARANG:", cart);
}

// DeleteAllProduk
export function clearCart(): void {
    localStorage.removeItem("swiftly_cart");
}