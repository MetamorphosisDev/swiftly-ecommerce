import { API } from "../../services/apiCommerce";
import { currencyConvert } from "../../utils/produkItem/currencyConverter";
import { idElementPageDetail } from "../../navigation/navigationDetailProduct";
import { upperCase_Letter } from "../../utils/produkItem/uppercaseLatterfirst";

//random
function getRandomProducts(data: any[], count: number) {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// Fetch - Panggil
async function fetchrecomendedproduct(): Promise<void> {
    try {
        const res = await fetch(API.FAKESTORE);
        if (!res.ok) throw new Error("Gagal fetch produk");

        const data = await res.json();
        const container = document.getElementById('listrecommendedProduk');
        if (!container) return;

        const randomProducts = getRandomProducts(data, 4); // ambil 4 random

        container.innerHTML = "";

        randomProducts.forEach((product) => {
            const el = document.createElement("div");
            el.classList.add("animate-fade-up");
            el.innerHTML = `
                <div class="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer
                 hover:bg-gray-50 active:scale-[0.98] transition-all duration-200
                    border border-transparent hover:border-gray-100 bg-color_searchbar hover:scale-102">

                    <!-- Gambar -->
                    <div class="w-14 h-14 shrink-0 rounded-lg bg-gray-50 flex items-center justify-center p-1.5">
                        <img src="${product.image}"
                             class="w-full h-full object-contain"
                             loading="lazy" />
                    </div>

                    <!-- Info -->
                    <div class="flex-1 min-w-0">
                        <p class="text-[8px] text-gray-400 uppercase tracking-wide mb-0.5 w-30">
                            ${upperCase_Letter(product.category)}
                        </p>
                        <p class="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug">
                            ${product.title}
                        </p>
                        <div class="flex items-center gap-1.5 mt-1 w-30">
                            <img src="/icon/starRating.svg" class="h-3 w-3" />
                            <span class="text-[10px] text-gray-400">
                                ${product.rating.rate} (${product.rating.count})
                            </span>
                        </div>
                    </div>

                    <!-- Harga -->
                    <div class="shrink-0 text-right">
                        <p class="text-2xs font-bold text-neutral whitespace-nowrap max-[1250px]:min-[750px]:hidden">
                            Rp${currencyConvert(product.price).toLocaleString("id-ID")}
                        </p>
                    </div>

                </div>
            `;
            idElementPageDetail(el, product.id);
            container.appendChild(el);
        });

    } catch (error) {
        console.error("Error:", error);
    }
}

fetchrecomendedproduct()