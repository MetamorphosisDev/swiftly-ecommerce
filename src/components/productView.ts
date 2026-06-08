import { API } from "../services/apiCommerce";

import type { ProductType } from "../data/productType/productCategoryType";

import { productCategorylist } from "../data/productType";

import { upperCase_Letter } from "../utils/produkItem/uppercaseLatterfirst";

import { currencyConvert } from "../utils/produkItem/currencyConverter";
import { idElementPageDetail } from "../navigation/navigationDetailProduct";

// Data
let allProducts: ProductType[] = [];
let currentProducts: ProductType[] = [];


// Fetch - Panggil
async function fetchProducts(): Promise<void> {
    try {
        const response = await fetch(API.FAKESTORE);
        if (!response) throw new Error("Error fetch API");

        const data: ProductType[] = await response.json();
        allProducts = data // Allproduct dan current dimasukan array "data"
        currentProducts = data;
        renderProducts(currentProducts);

    } catch (error) {
        console.error("Error fetch produk:", error);
    }
}

// Render Kategori - Panggil
function renderKategori(): void {
    const container = document.getElementById("kategoryview");
    if (!container) return;

    container.innerHTML = "";

    productCategorylist.forEach((s, index) => {
        const el = document.createElement("button");
        el.classList.add(
            "flex", "items-center", "gap-3", "px-3", "py-1",
            "rounded-[10px]", "bg-[#ffffff]", "transition", "duration-300",
            "hover:scale-105", "hover:shadow-sm", "animate-fade-up"
        );
        el.style.animationDelay = `${index * 10}ms`;

        el.innerHTML = `
        <div class="rounded-[10px] p-2 flex items-center justify-center" style="background-color: ${s.colorCircle}">
            <img src="${s.img}" class="w-4.5 h-5 object-contain" alt="${s.name}"/>
        </div>
            <p class="font-medium text-xs sm:text-sm text-center">${s.name}</p>
        `;

        // addEventListener di DALAM forEach — bisa akses `s`
        el.addEventListener("click", () => {
            filterCategory(s.apiKey);
        });

        container.appendChild(el);
    });
}

// Render Produk
function renderProducts(data: ProductType[]): void {
    const container = document.getElementById("productApi");
    if (!container) return;
    container.innerHTML = "";

    data.forEach((element) => {
        const elDiv = document.createElement("div");
        elDiv.classList.add("animate-fade-up")
        elDiv.innerHTML = `
        <div class="h-full p-3 cursor-pointer transition-all duration-300 hover:scale-102 flex flex-col">
            <div class="flex flex-col gap-3 flex-1">
                <div class="flex items-center justify-center h-32 sm:h-40">
                    <img src="${element.image}" class="max-h-full w-auto object-contain" loading="lazy"/>
                </div>
                <div class="flex flex-col flex-1 justify-between">
                    <div>
                        <p class="text-[9px] md:text-xs text-gray-500">${upperCase_Letter(element.category)}</p>
                        <p class="font-bold text-sm leading-tight line-clamp-2 mt-1">${element.title}</p>
                        <p class="text-[9px] md:text-xs text-accent font-medium mt-1">${element.promo}</p>
                    </div>
                    <div class="mt-2 flex justify-between items-center gap-1">
                        <div class="flex text-xs items-center gap-1">
                            <img src="/icon/starRating.svg" class="h-3 sm:h-4"/>
                            <p class="truncate text-[8px] sm:text-[12px]">${element.rating.rate} (${element.rating.count})</p>
                        </div>
                        <p class="font-bold text-neutral text-[9px] md:text-sm  whitespace-nowrap">Rp${currencyConvert(element.price).toLocaleString("id-ID")}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
        idElementPageDetail(elDiv, element.id) // Pages Detail Product

        container.appendChild(elDiv);
    });
}




// Filter Kategori
function filterCategory(apiKey: string): void {
    if (apiKey === "all") {
        currentProducts = allProducts;
        renderProducts(currentProducts)
        return;
    }

    currentProducts = allProducts.filter((p) => p.category === apiKey);
    renderProducts(currentProducts);
}

// Produk Harga tertinggi
function sortHighestPrice(): void {
    currentProducts = [...currentProducts].sort(
        (a, b) => b.price - a.price
    );

    renderProducts(currentProducts);
}

// Produk harga terendah
function sortLowestPrice(): void {
    currentProducts = [...currentProducts].sort(
        (a, b) => a.price - b.price
    )
    renderProducts(currentProducts)
}

// produk rating tertinggi
function highestRating(): void {
    currentProducts = [...currentProducts].sort(
        (a, b) => b.rating.rate - a.rating.rate
    )
    renderProducts(currentProducts)
}

function range_Product(): void {
    const container_Range = document.getElementById("kategory-Range") as HTMLElement
    container_Range.classList.add("animate-fade-up")
    container_Range.innerHTML = `
    <button id="highest" class="bg-indigo-200 p-1 px-3 rounded-[10px] transition-all duration-200 hover:bg-indigo-300 relative overflow-hidden"><span class="absolute bg-indigo-300 w-20 h-20 rounded-full -top-8 -left-4"></span>
    <span class="relative z-10">Harga Tertinggi</span>
    </button>

    <button id="lowest" class="bg-green-200 p-1 px-3 rounded-[10px] transition-all duration-200 hover:bg-green-300 relative overflow-hidden"><span class="absolute bg-green-300 w-20 h-20 rounded-full -top-8 -left-4"></span>
    <span class="relative z-10">Harga Terendah</span>
    </button>
    `
    document.getElementById("highest")?.addEventListener("click", sortHighestPrice);
    document.getElementById("lowest")?.addEventListener("click", sortLowestPrice);
    document.getElementById("ratinghighest")?.addEventListener("click", highestRating);

}


// Search
export async function initSearch(): Promise<void> {
    const inputsearch = document.getElementById("searchInput") as HTMLInputElement | null;
    const result = document.getElementById("searchResult") as HTMLElement | null;

    if (!inputsearch || !result) return; // Guard kalau element ga ada

    // Fetch semua produk khusus buat search (cache sederhana)
    let allProducts: ProductType[] = [];
    try {
        const res = await fetch(API.FAKESTORE);
        allProducts = await res.json();
    } catch {
        console.error("Search: gagal fetch produk");
        return;
    }

    const closeResult = () => {
        result.innerHTML = "";
        result.classList.add("hidden");
    };

    inputsearch.addEventListener("input", () => {
        const keyword = inputsearch.value.toLowerCase().trim();
        if (!keyword) { closeResult(); return; }

        const filtered = allProducts.filter((p) =>
            p.title.toLowerCase().includes(keyword)
        );

        result.innerHTML = "";

        if (filtered.length === 0) {
            result.innerHTML = `<p class="text-sm text-gray-400 px-4 py-3">Produk tidak ditemukan</p>`;
            result.classList.remove("hidden");
            return;
        }

        filtered.slice(0, 4).forEach((product) => {
            const item = document.createElement("div");
            item.className = "flex gap-3 items-center px-4 py-2.5 hover:bg-gray-200 cursor-pointer border-b border-gray-100 last:border-0 transition-all";
            item.innerHTML = `
                <div class="w-10 h-10 shrink-0 flex items-center justify-center bg-gray-50 rounded p-1">
                    <img src="${product.image}" class="w-full h-full object-contain" loading="lazy">
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-800 truncate line-clamp-2">${product.title}</p>
                    <p class="text-xs text-gray-400">${upperCase_Letter(product.category)}</p>
                    <div class="flex text-xs items-center gap-1 mt-1">
                        <img src="/icon/starRating.svg" class="h-3 sm:h-4"/>
                        <p class="truncate text-[8px] sm:text-[12px]">${product.rating.rate} (${product.rating.count})</p>
                    </div>
                </div>
                <p class="text-sm font-bold text-secondary shrink-0 hidden md:inline">
                    Rp${currencyConvert(product.price).toLocaleString("id-ID")}
                </p>
            `;
            item.addEventListener("click", () => {
                idElementPageDetail(item, product.id)
            })
            result.appendChild(item);
        });

        result.classList.remove("hidden");
    });



    document.addEventListener("click", (e) => {
        if (!inputsearch.contains(e.target as Node) && !result.contains(e.target as Node)) {
            closeResult();
        }
    });

    inputsearch.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeResult();
    });
}



// Tampilkan()
export function productView(): void {
    renderKategori();
    range_Product();
    fetchProducts();
}

