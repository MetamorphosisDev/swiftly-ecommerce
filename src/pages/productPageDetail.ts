import { API } from "../services/apiCommerce";
import type { ProductType } from "../data/productType/productCategoryType";
import { currencyConvert } from "../utils/produkItem/currencyConverter";

async function getDetailApi() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    const res = await fetch(API.FAKESTORE);
    const data = await res.json();

    const product = data.find((item: any) => item.id == id);


    if (!product) {
        console.error("Product tidak ditemukan");
        return;
    }

    renderDetail(product);
}

function renderDetail(product: ProductType) {
    const container = document.getElementById("main_detail");
    if (!container) return;

    container.innerHTML = `
        <div class="max-w-5xl mx-auto px-4 py-8 md:py-12">

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
                                <span>${product.rating.count} ulasan</span>
                            </div>
                        </div>

                        <!-- Title -->
                        <h1 class="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                            ${product.title}
                        </h1>

                        <!-- Price -->
                        <div class="flex items-baseline gap-2">
                            <span class="text-3xl font-bold text-secondary">
                                Rp${currencyConvert(product.price).toLocaleString("id-ID")}
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
                            <button
                                id="toggleDesc"
                                class="text-xs text-secondary font-medium mt-1.5 hover:underline"
                                onclick="
                                    const el = document.getElementById('descText');
                                    const btn = document.getElementById('toggleDesc');
                                    el.classList.toggle('line-clamp-5');
                                    btn.textContent = el.classList.contains('line-clamp-5') ? 'Lihat selengkapnya' : 'Sembunyikan';
                                "
                            >
                                Lihat selengkapnya
                            </button>
                        </div>

                        <!-- Divider -->
                        <hr class="border-gray-100"/>

                        <!-- Quantity + Actions -->
                        <div class="flex items-center gap-3 flex-wrap">
                            <!-- Quantity -->
                            <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    class="px-3 py-2 text-gray-500 hover:bg-gray-100 transition-colors text-lg font-light"
                                    onclick="
                                        const q = document.getElementById('qty');
                                        if(+q.value > 1) q.value = +q.value - 1;
                                    "
                                >−</button>
                                <input
                                    id="qty"
                                    type="number"
                                    value="1"
                                    min="1"
                                    class="w-12 text-center text-sm font-medium border-0 focus:ring-0 bg-transparent"
                                    readonly
                                />
                                <button
                                    class="px-3 py-2 text-gray-500 hover:bg-gray-100 transition-colors text-lg font-light"
                                    onclick="
                                        const q = document.getElementById('qty');
                                        q.value = +q.value + 1;
                                    "
                                >+</button>
                            </div>

                            <!-- Keranjang -->
                            <button class="flex-1 bg-secondary text-white py-2.5 px-5 rounded-lg font-semibold text-sm hover:bg-brand-strong transition-colors flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                                Tambah ke Keranjang
                            </button>

                            <!-- Wishlist -->
                            <button class="p-2.5 border border-gray-200 rounded-lg text-gray-400">
                                <img src="/icon/Suka.svg" class="h-5 w-5" alt="wishlist"/>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    `;
}

getDetailApi();