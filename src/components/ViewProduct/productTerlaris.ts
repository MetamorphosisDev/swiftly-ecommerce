import { API } from "../../services/apiCommerce";
import { currencyConvert } from "../../utils/produkItem/currencyConverter";
import { idElementPageDetail } from "../../navigation/navigationDetailProduct";
import { upperCase_Letter } from "../../utils/produkItem/uppercaseLatterfirst";


// Fetch - Panggil
async function fetchProductRating(): Promise<void> {
    try {
        const res = await fetch(API.FAKESTORE);
        if (!res.ok) {
            throw new Error("Gagal fetch produk");
        }
        const data = await res.json();
        const container = document.getElementById('listProdukTerlaris');
        if (!container) return;

        const topProducts = data
            .sort((a: any, b: any) => b.rating.rate - a.rating.rate)
            .slice(0, 5);

        container.innerHTML = "";
        topProducts.forEach((element: any) => {
            const item = document.createElement("div");
            idElementPageDetail(item, element.id)
            item.innerHTML = `
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
            container.appendChild(item);
        });

    } catch (error) {
        console.error(error);
    }
}

fetchProductRating()