import { API } from "../services/apiCommerce";

import type { ProductType } from "../data/productType/productCategoryType";

import { productCategorylist } from "../data/productType/productType";

import { currencyConvert } from "../utils/produkItem/currencyConverter";
import { upperCase_Letter } from "../utils/produkItem/uppercaseLatterfirst";
import { getword } from "../utils/produkItem/getWordThree";
import { parameter70Character } from "../utils/produkItem/charactermax70";

// Data
let allProducts: ProductType[] = [];

// Fetch - Panggil
async function fetchProducts(): Promise<void> {
    try {
        const response = await fetch(API.FAKESTORE);
        if (!response) throw new Error("Error fetch API");

        const data: ProductType[] = await response.json();
        allProducts = data // Allproduct dimasukan array "data"
        renderProducts(allProducts);

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
            "hover:scale-105", "hover:shadow-md", "animate-fade-up"
        );
        el.style.animationDelay = `${index * 10}ms`;

        el.innerHTML = `
            <img src="${s.img}" class="w-5" alt="${s.name}"/>
            <p>${s.name}</p>
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
        elDiv.innerHTML = `
        <div class="h-74 mt-15 p-3">
            <div class="flex flex-col gap-5">
                <div id="image" class="flex flex-col items-center">
                    <img src="${element.image}" class="h-40" />
                </div>
                <div id="text-description" class="">
                    <div class="topDesc">
                        <div id="Categories"><p class="text-xs">${upperCase_Letter(element.category)}</p></div>
                        <div id="Title" class="h-13"><p class="font-bold">${parameter70Character(element.title)}</p></div>
                        <div id="Desc-3-word"><p class="text-xs text-accent font-medium">
                        ${getword(upperCase_Letter(element.description))}</p></div>
                    </div>
                    <div class="topBottom mt-1 flex justify-between">
                        <div class="flex text-xs items-center gap-1">
                            <img src="/icon/starRating.svg" class="h-5"/>
                            <p>${element.rating.rate} (${element.rating.count})</p>
                        </div>
                        <div>
                            <p class="font-bold text-neutral">Rp${currencyConvert(element.price)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        container.appendChild(elDiv);
    });
}



// Filter Kategori
function filterCategory(apiKey: string): void {
    if (apiKey === "all") {
        renderProducts(allProducts);
        return;
    }

    const filtered = allProducts.filter((p) => p.category === apiKey);
    renderProducts(filtered);
}



// Tampilkan()
export function productView(): void {
    renderKategori();
    fetchProducts();
}

// ${ element.title }
// ${ currencyConvert(element.price) }