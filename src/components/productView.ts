import { API } from "../services/apiCommerce";
import type { ProductType } from "../data/productType/productCategoryType";
import { productCategorylist } from "../data/productType/productType";
// ===== DATA =====
let allProducts: ProductType[] = [];

// ===== FETCH PRODUK =====
async function fetchProducts(): Promise<void> {
    try {
        const response = await fetch(API.FAKESTORE);
        if (!response.ok) throw new Error("Gagal fetch API");

        const data: ProductType[] = await response.json();
        allProducts = data;
        renderProducts(allProducts);

    } catch (error) {
        console.error("Error fetch produk:", error);
    }
}

// ===== RENDER PRODUK =====
function renderProducts(data: ProductType[]): void {
    const container = document.getElementById("productApi");
    if (!container) return;

    container.innerHTML = "";

    data.forEach((element) => {
        const elDiv = document.createElement("div");
        elDiv.innerHTML = `
            <div style="border:1px solid #ddd; padding:10px; margin:10px;">
                ${element.title}
            </div>
        `;
        container.appendChild(elDiv);
    });
}
// ===== CATEGORY LIST =====

// ===== FILTER KATEGORI =====
function filterCategory(apiKey: string): void {
    if (apiKey === "all") {
        renderProducts(allProducts);
        return;
    }

    const filtered = allProducts.filter((p) => p.category === apiKey);
    renderProducts(filtered);
}

// ===== RENDER KATEGORI =====
function renderKategori(): void {
    const container = document.getElementById("kategoryview");
    if (!container) return;

    container.innerHTML = "";

    productCategorylist.forEach((s, index) => {
        const el = document.createElement("button");

        el.classList.add(
            "flex", "items-center", "gap-3", "border", "px-3", "py-1",
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

// ===== EXPORT =====
export function productView(): void {
    renderKategori();
    fetchProducts();
}