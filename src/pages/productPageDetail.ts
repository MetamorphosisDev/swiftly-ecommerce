import { API } from "../services/apiCommerce";
import type { ProductType } from "../data/TypeData_Object/product_TypeData";
import { currencyConvert } from "../utils/produkItem/currencyConverter";
import { upperCase_Letter } from "../utils/produkItem/uppercaseLatterfirst";
import { idElementPageDetail } from "../navigation/navigationDetailProduct";
import { notification_Login_Register } from "../components/notifications_Element/Loginregister_Notification_Account";
import { getCurrentUser } from "../auth/authService";
import { addToCart } from "../services/cart_Services";
import { NotificationsToast } from "../components/notifications_Element/productToast_product_Notification";
import { addToWishlist } from "../services/wishlist_Services";
import { removeWishlist } from "../services/wishlist_Services";
import type { wishlistItem } from "../data/TypeData_Object/wishlistItem_Type";


async function getDetailApi() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;
    const res = await fetch(API.FAKESTORE);
    const data: ProductType[] = await res.json();

    const product = data.find((item: any) => item.id == id);
    if (!product) {
        console.error("Product tidak ditemukan");
        return;
    }

    const related = data
        .filter((item: ProductType) => item.category === product.category && item.id !== product.id);

    const filterrenderProdukLainnya = data
        .filter(item => item.id !== product.id && item.category !== product.category)
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);

    renderDetail(product);
    renderRekomendasi(related);
    renderProduklainnya(filterrenderProdukLainnya)
}

function renderDetail(product: ProductType) {
    const container = document.getElementById("main_detail");
    if (!container) return;

    container.innerHTML = `
        <div class="max-w-5xl mx-auto px-4 pt-10">

            <!-- Breadcrumb -->
            <nav class="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
                <a href="/" class="hover:text-gray-600 transition-colors">Home</a>
                <span>/</span>
                <span class="capitalize">${product.category}</span>
                <span>/</span>
                <span class="text-gray-600 truncate max-w-[200px]">${product.title}</span>
            </nav>

            <!-- Main Card -->
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="flex flex-col md:flex-row">

                    <!-- Image Panel -->
                    <div class="md:w-2/5 bg-gray-50 flex items-center justify-center p-10 min-h-[300px] md:min-h-[420px]">
                        <img
                            src="${product.image}"
                            alt="${product.title}"
                            class="max-h-72 w-auto object-contain drop-shadow-md transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                        />
                    </div>

                    <!-- Info Panel -->
                    <div class="md:w-3/5 p-6 md:p-10 flex flex-col gap-5">

                        <!-- Category + Rating -->
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold tracking-widest uppercase text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                                ${product.category}
                            </span>
                            <div class="flex items-center gap-1.5 text-sm text-gray-500">
                                <img src="/icon/starRating.svg" class="h-4 w-4" alt="rating"/>
                                <span class="font-medium text-gray-700">${product.rating.rate}</span>
                                <span class="text-gray-300">·</span>
                                <span>${product.rating.count} Ulasan</span>
                            </div>
                        </div>

                        <!-- Title -->
                        <h1 class="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                            ${product.title}
                        </h1>

                        <!-- Price -->
                        <div class="flex items-baseline gap-2">
                            <span class="text-3xl font-bold text-secondary">
                                Rp${currencyConvert(product.price).toLocaleString("id-ID")}<span class="text-xl">,00</span>
                            </span>
                        </div>

                        <!-- Divider -->
                        <hr class="border-gray-100"/>

                        <!-- Description -->
                        <div>
                            <p class="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Deskripsi</p>
                            <p class="text-sm text-gray-600 leading-relaxed line-clamp-5" id="descText">
                                ${product.description}
                            </p>
                            <div class="text-accent font-semibold py-1">${product.promo}</div>
                        </div>
                        <!-- Divider -->
                        <hr class="border-gray-100"/>

                        <!-- Quantity + Actions -->
                        <div class="flex items-center gap-3 flex-wrap">
                            <!-- Keranjang -->
                            <button class="flex-1 bg-secondary text-white py-2.5 px-5 rounded-lg font-semibold text-sm hover:bg-brand-strong transition-colors flex items-center justify-center gap-2 cursor-pointer" id="tambahKekeranjang_Lp">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                                Tambah ke Keranjang
                            </button>

                            <!-- Wishlist -->
                             <button id="wishlistBtn"class="p-2.5 border border-gray-200 rounded-lg transition-all hover:scale-105 cursor-pointer">
                                <svg
                                    id="wishlistIcon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    class="h-5 w-5 text-gray-400"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    const titleText =
        product.title.length > 10
            ? product.title.slice(0, 10) + "..."
            : product.title;
    const btn_keranjang = document.getElementById("tambahKekeranjang_Lp") as HTMLElement | null;
    btn_keranjang?.addEventListener("click", () => {
        if (!getCurrentUser()) {
            notification_Login_Register()
            return;
        } else if (getCurrentUser()) {
            NotificationsToast("success", `Produk ${titleText} Masuk ke Keranjang`, "top-start", 2500)
            addToCart(product);
        } else {
            NotificationsToast("error", "Produk Gagal Masuk ke Keranjang", "top-start", 2500)
        }
    })

    const wishlist = JSON.parse(
        localStorage.getItem("swiftly_wishlist") || "[]"
    );
    const btn = document.getElementById("wishlistBtn");
    const icon = document.getElementById("wishlistIcon");



    let liked = wishlist.some(
        (item: wishlistItem) => item.id === product.id
    ); // True / False

    if (liked) {
        icon?.setAttribute("fill", "currentColor");
        icon?.classList.remove("text-gray-400");
        icon?.classList.add("text-red-500");
    }

    btn?.addEventListener("click", () => {
        if (!getCurrentUser()) {
            notification_Login_Register();
            return;
        }

        if (liked) {
            NotificationsToast("info", `Produk Dikeluarkan dari Wishlist`, "top-start", 2000)
            removeWishlist(product.id);
            icon?.setAttribute("fill", "none");
            icon?.classList.remove("text-red-500");
            icon?.classList.add("text-gray-400");
            liked = false;

        } else {
            NotificationsToast("success", `Produk Dimasukan ke Wishlist`, "top-start", 2000)
            addToWishlist(product);
            icon?.setAttribute("fill", "currentColor");
            icon?.classList.remove("text-gray-400");
            icon?.classList.add("text-red-500");
            liked = true;
        }
    });
}


function renderRekomendasi(products: ProductType[]) {
    const container = document.getElementById("main_detail");
    if (!container) return;

    const section = document.createElement("div");
    section.className = "max-w-5xl mx-auto px-4 pb-2";
    section.innerHTML = `
        <div class="mt-10">
            <h2 class="text-base font-bold text-gray-800 mb-4">Produk Serupa</h2>
            <div id="rekomendasiGrid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"></div>
        </div>
    `;
    container.appendChild(section);

    const grid = section.querySelector("#rekomendasiGrid") as HTMLElement;

    products.forEach((product) => {
        const el = document.createElement("div");
        el.innerHTML = `
            <div class="bg-white rounded-xl p-2 cursor-pointer hover:scale-102  transition-all duration-200 flex flex-col gap-3">
                <div class="flex items-center justify-center h-32 bg-gray-50 rounded-lg p-3">
                    <img src="${product.image}" class="max-h-full w-auto object-contain" loading="lazy"/>
                </div>
                <div class="flex flex-col gap-1 flex-1">
                    <p class="text-2xs text-gray-400 uppercase tracking-wide">${upperCase_Letter(product.category)}</p>
                    <p class="text-xs font-semibold text-gray-800 leading-snug truncate">${product.title}</p>
                    <div class="flex items-center gap-1 mt-0.5">
                        <img src="/icon/starRating.svg" class="h-3 w-3"/>
                        <span class="text-2xs text-gray-400">${product.rating.rate} (${product.rating.count})</span>
                    </div>
                </div>
                <p class="text-sm font-bold text-neutral">Rp${currencyConvert(product.price).toLocaleString("id-ID")}</p>
            </div>
        `;
        grid.appendChild(el);
        idElementPageDetail(el, product.id)

    });
}

function renderProduklainnya(products: ProductType[]) {
    const container = document.getElementById("main_detail");
    if (!container) return;

    const section_2 = document.createElement("div");
    section_2.className = "max-w-5xl mx-auto px-4 pb-12";
    section_2.innerHTML = `
        <div class="mt-10">
            <h2 class="text-base font-bold text-gray-800 mb-4">Produk Lainnya</h2>
            <div id="rekomendasiGrid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"></div>
        </div>
    `;
    container.appendChild(section_2);

    const grid = section_2.querySelector("#rekomendasiGrid") as HTMLElement;
    products.forEach((product) => {
        const el = document.createElement("div");
        el.innerHTML = `
            <div class="bg-white rounded-xl p-3 cursor-pointer hover:scale-102  transition-all duration-200 flex flex-col gap-3">
                <div class="flex items-center justify-center h-32 bg-gray-50 rounded-lg p-3">
                    <img src="${product.image}" class="max-h-full w-auto object-contain" loading="lazy"/>
                </div>
                <div class="flex flex-col gap-1 flex-1">
                    <p class="text-2xs text-gray-400 uppercase tracking-wide">${upperCase_Letter(product.category)}</p>
                    <p class="text-xs font-semibold text-gray-800 leading-snug truncate">${product.title}</p>
                    <div class="flex items-center gap-1 mt-0.5">
                        <img src="/icon/starRating.svg" class="h-3 w-3"/>
                        <span class="text-2xs text-gray-400">${product.rating.rate} (${product.rating.count})</span>
                    </div>
                </div>
                <p class="text-sm font-bold text-neutral">Rp${currencyConvert(product.price).toLocaleString("id-ID")}</p>
            </div>
        `;
        grid.appendChild(el);
        idElementPageDetail(el, product.id)

    });
}



getDetailApi();