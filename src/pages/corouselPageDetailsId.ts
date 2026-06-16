import type { CorouselType } from "../data/TypeData_Object/corousel_TypeData";
import { API } from "../services/apiCommerce";
import { notification_Login_Register } from "../components/notifications_Element/Loginregister_Notification_Account";
import { getCurrentUser } from "../auth/authService";

const currentUser = getCurrentUser();

async function getDetailCorouselJson() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id_corousel");

    if (!id) return;

    const res = await fetch(API.COROUSEL_DETAIL_API);
    const data: CorouselType[] = await res.json();
    const corousel_det = data.find((item: any) => item.id_corousel == id);
    if (!corousel_det) {
        console.error("corousel_det tidak ditemukan");
        return;
    }
    renderDetailCorouselJson(corousel_det)
}

const buttonSebagaiTamu_Det = currentUser ?
    ``

    : `<button class="text-secondary underline cursor-pointer" id="JelajahiSebagaiTamu_Detail_corousel">Jelajahi Produk - Sebagai Tamu</button>`

function renderDetailCorouselJson(corousel_det: CorouselType) {
    const container = document.getElementById("CorouselDetail")
    if (!container) return;
    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 py-6 md:px-8">

            <!-- Banner -->
            <div
                class="overflow-hidden rounded-2xl shadow-lg"
                style="background-color:${corousel_det.banner_color}"
            >
                <img
                    src="${corousel_det.image}"
                    alt="${corousel_det.title}"
                    class="w-full object-cover"
                >
            </div>

            <!-- Content -->
            <div class="mt-6 flex flex-col gap-6">

                <!-- Header -->
                <div class="flex flex-col gap-2">
                    <span class="w-fit rounded-full px-4 py-1 text-sm font-semibold text-white" style="background-color:${corousel_det.banner_color}">
                        Diskon ${corousel_det.discount}
                    </span>

                    <h1 class="text-2xl font-bold md:text-4xl">
                        ${corousel_det.title}
                    </h1>

                    <p class="text-gray-500 text-sm md:text-lg">
                        ${corousel_det.subtitle}
                    </p>
                </div>

                <!-- Informasi Promo -->
                <div class="grid gap-4 md:grid-cols-2">

                    <div class="rounded-xl border p-4">
                        <h3 class="font-semibold mb-2">
                            Periode Promo
                        </h3>

                        <p class="text-gray-600">
                            ${corousel_det.start_date}
                            –
                            ${corousel_det.end_date}
                        </p>
                    </div>

                    <div class="rounded-xl border p-4">
                        <h3 class="font-semibold mb-2">
                            Kategori
                        </h3>

                        <p class="text-gray-600">
                            ${corousel_det.category}
                        </p>
                    </div>

                </div>

                <!-- Deskripsi -->
                <div class="rounded-xl border p-5">
                    <h2 class="mb-3 text-xl font-bold">
                        Tentang Promo
                    </h2>

                    <p class="leading-relaxed text-gray-600">
                        ${corousel_det.description}
                    </p>
                </div>

                <!-- Benefit -->
                <div class="rounded-xl border p-5">
                    <h2 class="mb-4 text-xl font-bold">
                        Keuntungan Promo
                    </h2>

                    <ul class="space-y-3">
                        ${corousel_det.benefits.map(item => `
                            <li class="flex items-start gap-3">
                                <span class="text-green-500 font-bold">✓</span>
                                <span>${item}</span>
                            </li>
                        `).join("")}
                    </ul>
                </div>

                <!-- CTA -->
                <div class="flex justify-center gap-5">
                    <button 
                        class="rounded-xl px-8 py-3 text-white font-semibold transition hover:scale-105 cursor-pointer"
                        style="background-color:${corousel_det.banner_color}"
                        id="carousel_Page_Det"
                     >
                        Belanja Sekarang
                    </button>
                    ${buttonSebagaiTamu_Det}
                </div>

            </div>
        </div>
        `;
    document
        .getElementById("carousel_Page_Det")
        ?.addEventListener("click", () => {
            checkUserLogin();
        });
    document.getElementById("JelajahiSebagaiTamu_Detail_corousel")?.addEventListener("click", () => {
        window.location.href = "/"
    })

}

getDetailCorouselJson()

function checkUserLogin() {
    if (currentUser) {
        window.location.href = "/page/homePage.html";
    } else {
        notification_Login_Register()
    }
}


