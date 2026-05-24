import { corousel } from "../components/corousel";
import { productView } from "../components/productView";
import { animatedUI } from "../motions/animatedUitailwind";

function renderLandingPage() {
    const main = document.getElementById("main");
    if (!main) throw new Error("Error Page");

    main.innerHTML = `
        <div class="landing-page">
            <div id="carousel"></div>
            <div class="category-group px-15 flex flex-col gap-3 mt-10">
                <div id="text"><p class="font-semibold text-xl ${animatedUI.fadeUp}">Kategori</p></div>
                <div id="kategoryview" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5"></div>
            </div>
            <div id="productApi" class="grid grid-cols-4 gap-4 p-10"></div>
        </div>
    `;

    document.getElementById("carousel")?.appendChild(corousel());

    productView();
}

renderLandingPage();