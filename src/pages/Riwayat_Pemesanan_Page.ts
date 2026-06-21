import type { RiwayatType } from "../data/TypeData_Object/riwayatPemesanan_Type";
import { currencyConvert } from "../utils/produkItem/currencyConverter";

export function initRiwayatPage(): void {
    const container = document.getElementById("main_Riwayat_Page");
    if (!container) return;

    const riwayat: RiwayatType[] = JSON.parse(
        localStorage.getItem("swiftly_riwayat") || "[]"
    );

    container.innerHTML = riwayat.length ? renderList(riwayat) : renderEmpty();

    const buttons = container.querySelectorAll("button");
    const d = document.getElementById("overlowRiwayat")
    if (!d) return

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".order-card") as HTMLElement;
            const id = card?.getAttribute("data-id");
            if (!id) return;

            window.location.href = `/page/RiwayatDetail.html?id=${id}`;
        });
    });
}

function renderList(data: RiwayatType[]): string {
    return `
    <div class="max-w-5xl mx-auto space-y-6">
        <div class="space-y-4 flex flex-col gap-5" id="overlowRiwayat">
            ${data.map(order => `
                <div class="order-card bg-white rounded-2xl border border-gray-100 shadow-sm transition-shadow duration-200 overflow-hidden" data-id="${order.id}">
                    <div class="flex justify-between items-center px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                        <div class="space-y-0.5">
                            <p class="text-2xs font-bold uppercase tracking-wider text-gray-400">Order ID</p>
                            <p class="font-mono text-sm font-bold text-gray-800 tracking-tight">#${order.id.slice(0, 8).toUpperCase()}</p>
                        </div>
                        <span class="text-xs font-semibold px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary">
                            ${order.status}
                        </span>
                    </div>

                    <div class="px-6 py-4 bg-gray-50/30 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <button class="btn-detail text-xs text-secondary hover:underline cursor-pointer">Detail</button>
                        <div class="flex items-center space-x-2 text-xs text-gray-400">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>${new Date(order.purchaseDate).toLocaleString("id-ID", { dateStyle: 'medium', timeStyle: 'short' })}</span>
                        </div>
                        
                        <div class="flex justify-between sm:justify-end items-center sm:space-x-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                            <span class="sm:text-xs font-medium text-gray-500 uppercase tracking-wider text-2xs">Total Pembayaran</span>
                            <span class=" font-extrabold text-secondary tracking-tight sm:text-lg text-[13px]">
                                Rp ${currencyConvert(order.totalPrice).toLocaleString("id-ID")}
                            </span>
                        </div>
                    </div>

                </div>
            `).join("")}
        </div>
    </div>
    `;
}

function renderEmpty(): string {
    return `
    <div class="max-w-md mx-auto my-16 px-4 py-12 flex flex-col items-center justify-center text-center border-gray-100 rounded-2xl">
        <div class="p-4 bg-gray-50 rounded-full mb-4">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
        </div>
        <h3 class="text-base font-bold text-gray-800 tracking-tight">Belum ada riwayat pembelian</h3>
        <p class="text-xs text-gray-500 mt-1 max-w-xs mx-auto">Semua transaksi yang kamu lakukan nanti akan otomatis tercatat di halaman ini.</p>
    </div>
    `;
}


initRiwayatPage();