import { corousel } from "../components/corousel";
import { productView } from "../components/ViewProduct/productView";

export function renderLandingPage() {
    const main = document.getElementById("main");
    if (!main) return;

    main.innerHTML = `
        <div class="landing-page">
            <div id="carousel"></div>
            <div class="category-group px-6 sm:px-6 md:px-10 lg:px-15 flex flex-col gap-3 mt-10">
                <div id="text"><p class="font-semibold text-xl">Kategori</p></div>
                <div id="kategoryview" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5"></div>
                <div id="kategory-Range" class="mt-2 flex flex-wrap gap-3 text-[9.5px] md:text-[15px] lg:[18px]"></div>
                <div class="text-xl animate-fade-up font-semibold mt-2">Daftar Produk</div>
            </div>
            
            <div id="productApi" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-10 sm:pr-20 sm:pl-20 pb-3 pr-5 pl-5"></div>

            <div class="animate-fade-up px-7 py-5 sm:px-15 bg-color_navigationbar_top">
                <div class="Text-Promo font-semibold text-[18px] sm:py-0 py-3">Dapatkan<span class="text-secondary text-[20px] underline">Promo & Diskon</span> Sebanyak-banyaknya</div>
                <div id="Card-Promo" class="grid grid-cols-1 sm:grid-cols-3 gap-5 py-2 sm:py-5"></div>
            </div>

            <div id="produkTerlaris" class="px-6 sm:px-6 md:px-10 lg:px-15 flex flex-col gap-3 mt-2 w-full  animate-fade-up p-4">
                <div class="">
                    <div class="text-xl font-semibold mt-2">Best Sellers <span class="text-secondary text-[18px]">Bulan Ini</span></div>
                </div>
                <div id="listProdukTerlaris" class="flex gap-6 overflow-y-auto scroll-smooth"></div>
            </div>
            <div class="bg-color_navigationbar_top">
                <div class="px-6 sm:px-6 md:px-10 lg:px-15 flex flex-col gap-3 w-full  animate-fade-up p-4 py-10">
                    <div class="text-xl font-semibold ">Barang yang Mungkin Anda <span class="text-secondary">Sukai</span></div>
                    <div id="listrecommendedProduk" class="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 gap-2"></div>
                </div>
            </div>
        </div>
    `;

    document.getElementById("carousel")?.appendChild(corousel());

    productView();
}
renderLandingPage()
