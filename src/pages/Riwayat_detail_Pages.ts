import type { RiwayatType } from "../data/TypeData_Object/riwayatPemesanan_Type";
import { currencyConvert } from "../utils/produkItem/currencyConverter";


export function initRiwayatDetailPage(): void {
    const container = document.getElementById("Riwayat_detail_Page");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const riwayat: RiwayatType[] = JSON.parse(localStorage.getItem("swiftly_riwayat") || "[]");
    const data = riwayat.find(item => item.id === id);

    if (!data) {
        container.innerHTML = `<p class="text-center mt-24 text-gray-500">Data tidak ditemukan</p>`;
        return;
    }

    container.innerHTML = renderDetail(data);
}

function renderDetail(data: RiwayatType) {
    return `
    <div class="max-w-5xl mx-auto mt-30 px-4 space-y-6">
        <!-- HEADER CARD -->
        
        <div class="bg-white rounded-[28px] p-6 sm:p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100/50">
            <div class="flex items-start justify-between">
                <div>
                    <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">
                        Detail Pesanan
                    </h1>
                    <p class="text-sm text-gray-500 mt-1">
                        Order ID:
                        <span class="font-mono font-semibold text-gray-700">
                            #${data.id.slice(0, 8).toUpperCase()}
                        </span>
                    </p>
                </div>

                <span class="px-3 py-1 text-xs font-bold rounded-full border border-primary/20 bg-primary/5 text-primary">
                    ${data.status}
                </span>
            </div>

            <div class="mt-5 flex items-center justify-between text-sm text-gray-600">
                <span>Tanggal Pesanan</span>
                <span class="font-semibold text-gray-800">
                    ${new Date(data.purchaseDate).toLocaleString("id-ID")}
                </span>
            </div>

        </div>

        <!-- PRODUCT LIST CARD -->
        <div class="bg-white rounded-[28px] p-6 sm:p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100/50">

            <h2 class="text-lg font-bold text-gray-900 mb-5">
                Produk Dibeli
            </h2>

            <div class="space-y-4 h-70 overflow-y-auto">
                ${data.items.map(item =>
        `
                    <div class="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">

                        <div class="flex items-center gap-4">
                            <img src="${item.image}"
                                class="w-14 h-14 rounded-xl object-cover border border-gray-100">

                            <div>
                                <p class="text-sm font-semibold text-gray-900">
                                    ${(item.title).slice(0, 30)}
                                </p>
                                <p class="text-xs text-gray-500 mt-1">
                                    Jumlah: ${item.quantity}
                                </p>
                            </div>
                        </div>

                        <div class="text-sm font-bold text-secondary">
                            Rp ${currencyConvert(item.price * (item.quantity ?? 0)).toLocaleString('id-ID')}
                        </div>

                    </div>
                `).join("")}

            </div>

        </div>

        <!-- TOTAL CARD -->
        <div class="bg-white rounded-[28px] p-6 sm:p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100/50 flex justify-between items-center">

            <span class="text-gray-600 font-medium">
                Total Pembayaran
            </span>

            <span class="text-2xl font-black text-secondary tracking-tight">
                Rp ${currencyConvert(data.totalPrice).toLocaleString('id-ID')}
            </span>

        </div>

    </div>
    `;
}
initRiwayatDetailPage()