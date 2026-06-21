import type { wishlistItem } from "../data/TypeData_Object/wishlistItem_Type";

export function addToWishlist(product: wishlistItem): void {
    const wishlist: wishlistItem[] = JSON.parse(
        localStorage.getItem("swiftly_wishlist") || "[]"
    );

    const existing = wishlist.find(
        item => item.id === product.id
    );

    if (existing) return;

    wishlist.push(product);

    localStorage.setItem(
        "swiftly_wishlist",
        JSON.stringify(wishlist)
    );
    console.log("WISHLIST:", wishlist);
}

export function removeWishlist(id: number): void {
    const wishlist: wishlistItem[] = JSON.parse(
        localStorage.getItem("swiftly_wishlist") || "[]"
    );

    const newWishlist = wishlist.filter(
        item => item.id !== id
    );

    localStorage.setItem(
        "swiftly_wishlist",
        JSON.stringify(newWishlist)
    );
}

export function clearWishlist(): void {
    localStorage.removeItem("swiftly_wishlist");
}
