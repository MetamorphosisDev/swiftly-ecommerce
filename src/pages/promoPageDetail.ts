import type { promoType } from "../data/TypeData_Object/promo_TypeData";
import { API } from "../services/apiCommerce";
import { notification_Login_Register } from "../components/notifications_Element/Loginregister_Notification_Account";

// const session =
//     localStorage.getItem("swiftly_session") ||
//     sessionStorage.getItem("swiftly_session");

// const currentUser = session ? JSON.parse(session) : null;

const session =
    localStorage.getItem("swiftly_session") ||
    sessionStorage.getItem("swiftly_session");
const currentUser = session ? JSON.parse(session) : null;

async function getDetailPromo_Page() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id_promo_valid");

    if (!id) return;

    const res = await fetch(API.PROMO_API);
    const data: promoType[] = await res.json();
    const promo_det = data.find((item: any) => item.id_promo_valid == id);
    if (!promo_det) {
        return;
    }
    renderDetailPromoPage(promo_det)
}

function renderDetailPromoPage(promo_det: promoType) {
    const container = document.getElementById("PromoDetail_Page");
    if (!container) return;

    const progress = (promo_det.claimed / promo_det.quota) * 100;

    container.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 py-6">

        <!-- Hero -->
        <div
            class="rounded-3xl p-6 md:p-10 text-white shadow-lg"
            style="background: linear-gradient(135deg, ${promo_det.color}, ${promo_det.color}CC)"
        >
            <div class="flex flex-col gap-4">

                <span class="w-fit bg-white/20 px-4 py-1 rounded-full text-sm">
                    ${promo_det.category}
                </span>

                <h1 class="text-3xl md:text-5xl font-bold">
                    ${promo_det.title}
                </h1>

                <p class="text-white/90 text-sm md:text-lg">
                    ${promo_det.subtitle}
                </p>

                <div class="flex flex-wrap gap-3 mt-2">
                    <span class="bg-white px-4 py-2 rounded-xl font-bold" style="color:${promo_det.color}">
                        ${promo_det.discount}
                    </span>

                    <span class="bg-white/20 px-4 py-2 rounded-xl">
                        ⭐ ${promo_det.rating}
                    </span>

                    <span class="bg-white/20 px-4 py-2 rounded-xl">
                        ${promo_det.status.toUpperCase()}
                    </span>
                </div>

            </div>
        </div>

        <!-- Informasi -->
        <div class="grid md:grid-cols-3 gap-4 mt-6">

            <div class="border rounded-2xl p-4">
                <p class="text-gray-500 text-sm">Kode Promo</p>
                <h3 class="font-bold text-xl mt-1" style="color:${promo_det.color}">
                    ${promo_det.promoCode}
                </h3>
            </div>

            <div class="border rounded-2xl p-4">
                <p class="text-gray-500 text-sm">Mulai Berlaku</p>
                <h3 class="font-semibold mt-1">
                    ${promo_det.startDate}
                </h3>
            </div>

            <div class="border rounded-2xl p-4">
                <p class="text-gray-500 text-sm">Berakhir</p>
                <h3 class="font-semibold mt-1">
                    ${promo_det.validUntil}
                </h3>
            </div>

        </div>

        <!-- Deskripsi -->
        <div class="border rounded-2xl p-5 mt-6">
            <h2 class="font-bold text-2xl mb-3">
                Tentang Promo
            </h2>

            <p class="text-gray-600 leading-relaxed">
                ${promo_det.description}
            </p>
        </div>

        <!-- Progress -->
        <div class="border rounded-2xl p-5 mt-6">
            <div class="flex justify-between mb-3">
                <span class="font-semibold">Voucher Diklaim</span>
                <span class="text-gray-500">
                    ${promo_det.claimed} / ${promo_det.quota}
                </span>
            </div>

            <div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                    class="h-full rounded-full"
                    style="
                        width:${progress}%;
                        background:${promo_det.color};
                    "
                ></div>
            </div>
        </div>

        <!-- Benefit -->
        <div class="border rounded-2xl p-5 mt-6">
            <h2 class="font-bold text-2xl mb-4">
                Keuntungan Promo
            </h2>

            <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${promo_det.benefits.map(item => `
                    <li class="flex gap-3">
                        <span class="text-green-500 font-bold">✓</span>
                        <span>${item}</span>
                    </li>
                `).join("")}
            </ul>
        </div>

        <!-- Terms -->
        <div class="border rounded-2xl p-5 mt-6">
            <h2 class="font-bold text-2xl mb-4">
                Syarat & Ketentuan
            </h2>

            <ul class="space-y-3">
                ${promo_det.terms.map(item => `
                    <li class="flex gap-3">
                        <span class="text-red-500 font-bold">•</span>
                        <span>${item}</span>
                    </li>
                `).join("")}
            </ul>
        </div>

        <!-- CTA -->
        <div class="flex justify-center mt-8">
            <button
                class="px-8 py-3 rounded-xl text-white font-semibold hover:scale-105 transition cursor-pointer"
                style="background:${promo_det.color}"
                id="ButtongunakanPromo"
            >
                Gunakan Promo
            </button>
        </div>

    </div>
    `;
    document.getElementById("ButtongunakanPromo")?.addEventListener("click", () => {
        if (!currentUser) {
            notification_Login_Register()
        } else { window.location.href = "/page/homePage.html" }
    })
}

getDetailPromo_Page()