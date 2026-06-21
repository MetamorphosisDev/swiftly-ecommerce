import type { wishlistItem } from "../data/TypeData_Object/wishlistItem_Type";
import { currencyConvert } from "../utils/produkItem/currencyConverter";
import { addToWishlist, clearWishlist, removeWishlist } from "../services/wishlist_Services";
import { addToCart } from "../services/cart_Services";
import { idElementPageDetail } from "../navigation/navigationDetailProduct";

export function initWishlistPage(): void {
    const container = document.getElementById("main_Wishlist_Page") as HTMLDivElement
    if (!container) return;
    let wishlist: wishlistItem[] = JSON.parse(
        localStorage.getItem("swiftly_wishlist") || "[]"
    );

    const renderWishlist = (): void => {
        container.innerHTML = wishlist.length
            ? wishlist.map(item => `
            <div class="group bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <!-- Image -->
                <div class="relative bg-gray-50 h-56 flex items-center justify-center p-4">
                    <img
                        data-id="${item.id}"
                        src="${item.image}"
                        alt="${item.title}"
                        class="product-image-Div max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />

                    <!-- Remove Button -->
                    <button
                     data-id="${item.id}"
                     class="wishlistBtn absolute top-3 right-3 p-2.5 border border-gray-200 rounded-lg transition-all hover:scale-105 cursor-pointer bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                    fill="currentColor" stroke="currentColor" class="wishlistIcon h-5 w-5 text-red-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                    </button>
                </div>

                <!-- Content -->
                <div class="p-5">
                    <h3 class="font-semibold text-gray-900 line-clamp-2 min-h-[48px]">
                        ${item.title}
                    </h3>

                    <p class="text-xl font-bold text-secondary mt-3">
                        Rp${currencyConvert(item.price).toLocaleString("id-ID")}
                    </p>

                    <button
                        data-id="${item.id}"
                        class="add-to-cart mt-5 w-full bg-secondary/10 text-secondary py-3 rounded-2xl font-semibold cursor-pointer transition hover:opacity-90 border border-secondary/20"
                    >
                        Tambah ke Keranjang
                    </button>
                </div>
            </div>
        `).join("")
            : `
        <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
            
            <div class="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-[#ABB4C7]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                </svg>
            </div>

            <h2 class="text-xl font-bold text-gray-900">
                Wishlist Masih Kosong
            </h2>

            <p class="text-gray-500 mt-2 max-w-sm">
                Simpan produk favoritmu ke wishlist agar lebih mudah ditemukan nanti.
            </p>
        </div>
        `;
        const product_batas = document.getElementById("ClearWishlistdiv") as HTMLDivElement;
        if (wishlist.length === 0) {
            product_batas.innerHTML = ``
        } else {
            product_batas.innerHTML = `
                    <button id = "clearWishlistBtn" class="p-2 text-secondary cursor-pointer hover:underline" > Hapus Daftar Keranjang </button>
            `
            clearProduct()
        }
        const buttons = document.querySelectorAll(".add-to-cart") as NodeListOf<HTMLElement>;

        buttons.forEach((element) => {
            element.addEventListener("click", () => {
                const id = Number(element.getAttribute("data-id"));
                if (!id) return;

                const product = wishlist.find(item => item.id == id);
                if (!product) return;

                addToCart(product);

                wishlist = wishlist.filter(item => item.id !== id);
                localStorage.setItem("swiftly_wishlist", JSON.stringify(wishlist));

                renderWishlist();
            });
        });
        const productImages = document.querySelectorAll(".product-image-Div") as NodeListOf<HTMLElement>;
        productImages.forEach(element => {
            element.addEventListener("click", () => {
                const productId = element.getAttribute('data-id');
                if (productId) {
                    idElementPageDetail(element, Number(productId));
                }
            });
        });

        document.querySelectorAll(".wishlistBtn").forEach(btn => {
            btn.addEventListener("click", () => {
                const icon = btn.querySelector(".wishlistIcon") as SVGElement;
                const active = icon.classList.contains("text-red-500");
                if (active) {
                    icon.classList.remove("text-red-500");
                    icon.classList.add("text-gray-400");
                    icon.setAttribute("fill", "none");

                    const id = Number(btn.getAttribute("data-id"));
                    if (!id) return;
                    wishlist = wishlist.filter(item => item.id !== id);
                    localStorage.setItem("swiftly_wishlist", JSON.stringify(wishlist));
                }
                else if (!active) {
                    icon.classList.remove("text-gray-400");
                    icon.classList.add("text-red-500");
                    icon.setAttribute("fill", "currentColor");
                }
            });
        });
    };
    function clearProduct() {
        // Clear cart
        const clearBtn = document.getElementById("clearWishlistBtn");
        if (!clearBtn) return;
        clearBtn.addEventListener("click", () => {
            clearWishlist();
            wishlist = [];
            renderWishlist()
        });
    }

    wishlist.length ? renderTambah_Item("Koleksi Favorit Kamu", "Masih ada ruang untuk menambah produk lain yang kamu suka")
        : renderTambah_Item("Temukan Produk Favorit Kamu", "Temukan produk menarik dan simpan favoritmu di sini")
    renderWishlist();
}

const tambahWhistlist_produk_button = document.getElementById("Tambah_Produk_Wishlist_button") as HTMLDivElement
function renderTambah_Item(title: string, description: string) {
    tambahWhistlist_produk_button.innerHTML = `
                <div id="liat_keranjang_batas_cartProduct">
                    <div class="flex sm:flex-row items-center justify-between gap-4 py-6 border-b border-gray-100 group transition-all duration-200 hover:bg-gray-50/50 px-3 rounded-2xl bg-[#f7f5f5] cursor-pointer">
                        <div class="flex items-center gap-4 min-w-0 flex-1">
                            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                                <img
                                    src="/icon/Image_Alt_none.svg"
                                    alt="Alt" 
                                    class="max-w-full max-h-full object-contain p-1 rounded-2xl"
                                />
                            </div>
                            <div class="min-w-0 flex-1">
                                <h3 class="font-semibold text-base sm:text-lg text-gray-900 truncate group-hover:text-secondary transition-colors duration-200">
                                    ${title}
                                </h3>
                                <p class="text-gray-500 text-xs">${description}</p>
                            </div>
                        </div>
                        <div class="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100/70">
                        <div class="flex items-center gap-2 bg-secondary p-1 rounded-xl mb-3">
                            <button class="btn-add px-2 font-bold cursor-pointer text-2xl text-white">+</button>
                        </div>
                        </div>
                    </div>
                </div>
            `
    tambahWhistlist_produk_button?.addEventListener("click", () => {
        window.location.href = "/page/homePage.html#main"
    })

}
initWishlistPage()
