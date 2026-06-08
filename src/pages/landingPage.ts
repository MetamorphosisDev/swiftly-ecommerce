import { corousel } from "../components/corousel";
import { productView } from "../components/productView";

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
            <div id="produkTerlaris" class="px-6 sm:px-6 md:px-10 lg:px-15 flex flex-col gap-3 mt-2 w-full bg-color_navigationbar_top animate-fade-up p-4">
                <div>
                    <div class="text-xl font-semibold mt-2">Produk Terlaris</div>
                    <div class="text-[15px] font-semibold text-secondary">Bulan ini</div>
                </div>
                <div id="listProdukTerlaris" class="flex gap-6 overflow-y-auto scroll-smooth"></div>
            </div>
        </div>
    `;

    document.getElementById("carousel")?.appendChild(corousel());

    productView();
}
renderLandingPage()
