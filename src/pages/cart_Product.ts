import type { CartItem } from '../data/TypeData_Object/CartItem_Type';
import { clearCart } from '../services/cart_Services';
import { currencyConvert } from '../utils/produkItem/currencyConverter';
import { CHECKOUT } from '../constants/checkout_Product';
import { getAccountUser, getCurrentUser } from '../auth/authService';
import type { UserRecord } from '../data/TypeData_Object/AccountSwiftly_Type';
import { NotificationsToast } from '../components/notifications_Element/productToast_product_Notification';
import type { RiwayatType } from '../data/TypeData_Object/riwayatPemesanan_Type';
import { addToRiwayat } from '../services/riwayatpemesanan_Services';

const currentUser = getCurrentUser();
const users = getAccountUser();
const user = users?.find((u: UserRecord) => u.id === currentUser?.id);
const primaryAddress = user?.addresses?.find((a) => a.isPrimary);

let cart: CartItem[] = JSON.parse(localStorage.getItem('swiftly_cart') || '[]');

export function initCartPage(): void {
    const container = document.getElementById('main_Keranjang_Page');
    if (!container) return;
    const renderCart = (): void => {
        container.innerHTML = cart.length
            ? cart
                .map((item) => {
                    const qty = item.quantity ?? 1;
                    const price = Number(item.price);
                    const totalItemPrice = price * qty;
                    return `
                    <div id="liat_keranjang_batas_cartProduct" class="w-full">
                        <!-- Card Item -->
                        <div class="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4 py-5 px-3 sm:px-4 border-b border-gray-100 group transition-all duration-300 hover:bg-gray-50/70 rounded-2xl">
                            <!-- Info Produk (Foto & Detail) -->
                            <div class="flex items-center gap-3 sm:gap-4 min-w-0 flex-1 w-full">
                                <input
                                    type="checkbox"
                                    class="checkProduct cursor-pointer w-4 h-4"
                                    data-id="${item.id}"
                                    id="CheckboxDiv${item.id}"
                                >
                                <!-- Frame Foto Produk -->
                                <div class="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl flex items-center justify-center border border-gray-200/80 shrink-0 overflow-hidden shadow-sm group-hover:border-gray-300 transition-colors duration-300">
                                    <img
                                        src="${item.image || 'https://placehold.co/150'}" 
                                        alt="${item.title}" 
                                        class="max-w-full max-h-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                
                                <!-- Detail Teks -->
                                <div class="min-w-0 flex-1">
                                    <div class="inline-block text-[8px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-md mb-1.5 uppercase tracking-wider">
                                        Terpilih
                                    </div>
                                    <h3 class="font-semibold text-sm sm:text-base text-gray-800 line-clamp-2 group-hover:text-secondary transition-colors duration-200 leading-snug">
                                        ${item.title}
                                    </h3>
                                    <p class="text-xs sm:text-sm font-medium text-gray-500 mt-1">
                                        Rp${currencyConvert(item.price).toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>

                            <!-- Aksi & Harga (Quantity Changer & Subtotal) -->
                            <div class="flex flex-row xs:flex-col justify-between xs:justify-center items-center xs:items-end gap-3 w-full xs:w-auto pt-3 xs:pt-0 border-t xs:border-t-0 border-gray-100/80">
                                <!-- Quantity Changer -->
                                <div class="flex items-center gap-1 bg-gray-100/80 p-1 rounded-xl border border-gray-200/30">
                                    <button data-id="${item.id}" class="btn-less w-7 h-7 flex items-center justify-center font-bold text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-all cursor-pointer select-none text-sm">-</button>
                                    <span class="w-8 text-center font-semibold text-sm text-gray-800 select-none">${qty}</span>
                                    <button data-id="${item.id}" class="btn-add w-7 h-7 flex items-center justify-center font-bold text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-all cursor-pointer select-none text-sm">+</button>
                                </div>
                                 
                                <!-- Subtotal -->
                                <div class="text-right">
                                    <p class="text-[10px] text-gray-400 font-bold tracking-wider uppercase xs:hidden mb-0.5">Subtotal</p>
                                    <p class="font-bold text-base text-grayw-900 tracking-tight">
                                        Rp${currencyConvert(totalItemPrice).toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
            `;
                })
                .join('')
            : `
            <div class="flex flex-col items-center justify-center px-4 text-center py-20">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400 border border-gracheckProducty-200/50">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                    </svg>
                </div>
                <h3 class="text-gray-900 font-semibold text-lg">Keranjangmu Masih Kosong</h3>
                <p class="text-gray-500 text-sm mt-1 max-w-xs mx-auto">Yuk, jelajahi platform Swiftly dan temukan produk impianmu sekarang!</p>
            </div>
        `;


        const Price_allproduct = document.getElementById('allProductPrice_tag') as HTMLDivElement;
        const product_batas = document.getElementById('clearCartDiv') as HTMLDivElement;
        const tambahPesanan_produk_button = document.getElementById('Tambah_Produk_keranjang_button') as HTMLDivElement;
        const RiwayatPemesanan_Page = document.getElementById('HalalamanRiwayat_button') as HTMLDivElement;

        // Checkbox
        const checkboxs = document.querySelectorAll(
            '.checkProduct',
        ) as NodeListOf<HTMLInputElement>;
        checkboxs.forEach((checkbox) => {
            checkbox.addEventListener('change', () => {
                renderPriceAll();
            });
        });

        if (cart.length === 0) {
            renderButton_Bottom('Tambah Produk Kamu', 'Jelajahi katalog dan tambahkan produk yang kamu butuhkan ke keranjang.', tambahPesanan_produk_button, '+', "/icon/Image_Alt_none.svg");

            product_batas.innerHTML = '';
            Price_allproduct.innerHTML = '';
        } else {
            renderButton_Bottom('Jelajahi Produk Lainnya', 'Jelajahi berbagai pilihan produk yang mungkin sesuai dengan kebutuhanmu.', tambahPesanan_produk_button, '+', "/icon/Image_Alt_none.svg");
            product_batas.innerHTML = `
                            <button id = "clearCartBtn" class="p-2 text-secondary cursor-pointer hover:underline" > Hapus Daftar Keranjang </button>
            `;
            clearProduct();
            renderPriceAll();
        }
        renderButton_Bottom('Riwayat Pemesanan', 'Liat riwayat pemesanan yang sebelumnya kamu beli.', RiwayatPemesanan_Page, '›', "/icon/riwayatPemesanan_Icon.svg");



        function renderPriceAll() {
            let totalPrice: number = 0;
            let totalItems: number = 0;
            let selectedItems: CartItem[] = [];
            // CheckBox
            checkboxs.forEach((checkbox) => {
                if (checkbox.checked) {
                    const id = Number(checkbox.dataset.id);
                    const product = cart.find((item) => item.id === id);
                    if (product) {
                        selectedItems.push(product);
                        totalPrice += product.price * (product.quantity ?? 1);
                        totalItems += product.quantity ?? 1;
                    }
                }
            });

            const isFreeShipping = totalPrice >= CHECKOUT.SHIPPING.MINIMUM_FEE;
            const UtilsShipping = isFreeShipping
                ? CHECKOUT.SHIPPING.FREE_FEE
                : CHECKOUT.SHIPPING.DEFAULT_FEE;
            const ongkirPromo = isFreeShipping
                ? `Rp0`
                : `Rp${currencyConvert(CHECKOUT.SHIPPING.DEFAULT_FEE).toLocaleString('id-ID')}`;

            const ongkirPromo_let = isFreeShipping
                ? `<p class="text-xs text-gray-400 leading-relaxed">Gratis Ongkir untuk pembelian di atas Rp${currencyConvert(CHECKOUT.SHIPPING.MINIMUM_FEE).toLocaleString('id-ID')}</p>`
                : ``;
            const PPNPajak_Lainnya: number = CHECKOUT.TAX.PPN_RATE * totalPrice;
            let GrandTotal_All: number =
                totalPrice +
                UtilsShipping +
                PPNPajak_Lainnya -
                CHECKOUT.DISCOUNT.VOUCHER_RATE;
            if (GrandTotal_All < 0) GrandTotal_All = 0
            Price_allproduct.innerHTML = `
                        <!-- Card Ringkasan Belanja Ultra Premium -->
                        <div class="bg-white rounded-[28px] p-5 sm:p-7 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100/50 sticky top-6 md:w-150 w-full transition-all duration-300">
                            <!-- Header Panel -->
                            <div class="pb-4 sm:pb-5 border-b border-gray-100/80 flex items-center justify-between">
                                <h3 class="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5">
                                    <!-- Ikon Struk -->
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Ringkasan Belanja
                                </h3>
                            </div>

                            <!-- Rincian Nama + Harga -->
                                <div class="flex justify-between items-center flex-row py-1.5">
                                    <span class="text-sm sm:text-base text-gray-500 font-medium">Nama</span>
                                    <span class="text-sm sm:text-base font-bold text-gray-900">
                                        ${currentUser.name}
                                    </span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-sm sm:text-base text-gray-500 font-medium">Alamat</span>
                                    <span class=" text-gray-400 font-normal text-xs">
                                    ${primaryAddress?.city ?? '-'}, ${primaryAddress?.province ?? '-'}
                                    </span>
                                </div>
                                <div class="flex justify-between items-center py-1.5">
                                    <span class="text-gray-500 font-medium text-sm">No. Telp</span>
                                    <span class=" text-gray-400 font-normal text-sm">
                                        (+62) ${user?.phone}
                                    </span>
                                </div>
                               <div class="border-t-[2px] border-dashed border-gray-200/80 my-2 relative">
                                    <div class="absolute -left-7 sm:-left-9 -top-2.5 w-5 h-5 bg-gray-50 rounded-full border-r border-gray-200/50 shadow-inner"></div>
                                <div class="absolute -right-7 sm:-right-9 -top-2.5 w-5 h-5 bg-gray-50 rounded-full border-l border-gray-200/50 shadow-inner"></div>
                            </div>
                            <div class="py-5 space-y-4">
                                <div class="flex justify-between items-center">
                                    <span class="text-sm sm:text-base text-gray-500 font-medium">Total Item</span>
                                    <span class="text-sm sm:text-base font-bold text-gray-800 bg-gray-50 px-3 py-1 rounded-xl border border-gray-100/80">
                                        ${totalItems} Barang <span class="text-gray-400 font-normal text-xs ml-0.5">(${cart.length} Jenis)</span>
                                    </span>
                                </div>

                                <div class="flex justify-between items-center">
                                    <span class="text-sm sm:text-base text-gray-500 font-medium">Subtotal Harga</span>
                                    <span class="text-sm sm:text-base font-bold text-gray-900">
                                        Rp${currencyConvert(totalPrice).toLocaleString('id-ID')}
                                    </span>
                                </div>

                                <div class="flex justify-between items-center">
                                    <span class="text-sm sm:text-base text-gray-500 font-medium">Ongkos Kirim</span>
                                    <span class="text-sm sm:text-base font-semibold text-gray-800 text-right">
                                        ${ongkirPromo}
                                    </span>
                                </div>

                                <!-- Highlight Box Voucher Diskon -->
                                <div class="flex justify-between items-center bg-emerald-50/80 border border-emerald-100 p-3 sm:p-3.5 rounded-2xl mt-2">
                                    <span class="text-xs sm:text-sm text-emerald-700 font-bold flex items-center gap-1.5">
                                        <!-- Ikon Tag Diskon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        Diskon Voucher
                                    </span>
                                    <span class="text-sm sm:text-base font-extrabold text-emerald-600">
                                        -Rp${currencyConvert(CHECKOUT.DISCOUNT.VOUCHER_RATE).toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>
                            <!-- Garis Pembatas (Gaya Tiket Potong) -->
                            <div class="border-t-[2px] border-dashed border-gray-200/80 my-2 relative">
                                <div class="absolute -left-7 sm:-left-9 -top-2.5 w-5 h-5 bg-gray-50 rounded-full border-r border-gray-200/50 shadow-inner"></div>
                                <div class="absolute -right-7 sm:-right-9 -top-2.5 w-5 h-5 bg-gray-50 rounded-full border-l border-gray-200/50 shadow-inner"></div>
                            </div>

                            <!-- Total Pembayaran -->
                            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-1 mt-6 mb-6">
                                <span class="font-bold text-sm sm:text-base text-gray-600">Total Tagihan</span>
                                <span class="font-black text-3xl text-secondary tracking-tight">
                                    <span class="text-lg mr-0.5">Rp</span>${currencyConvert(GrandTotal_All).toLocaleString('id-ID')}
                                </span>
                            </div>

                            <!-- Alert Box Ringan (Syarat & Ketentuan) -->
                            <div class="mb-5 bg-blue-50/50 border border-blue-100/50 p-3.5 rounded-2xl flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div class="w-full">
                                    <p class="text-[11px] sm:text-xs font-semibold text-blue-900/80 leading-relaxed">
                                        Harga total sudah termasuk PPN & pajak lainnya.
                                    </p>
                                    <div class="text-[11px] sm:text-xs mt-1 font-medium text-gray-600">
                                        ${ongkirPromo_let}
                                    </div>
                                </div>
                            </div>
                            <div class="mb-5 bg-blue-50/50 border border-blue-100/50 p-3.5 rounded-2xl flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div class="w-full">
                                    <div class="text-[11px] sm:text-xs mt-1 font-medium text-gray-600">
                                        Rincian tagihan telah dihitung secara otomatis berdasarkan produk, ongkir, pajak, dan diskon.
                                    </div>
                                </div>
                            </div>

                            <!-- Tombol Checkout Super responsif -->
                            <button class="group w-full flex justify-center items-center gap-2 bg-secondary text-white py-4.5 sm:py-5 rounded-2xl font-black text-base sm:text-lg shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_12px_25px_rgba(0,0,0,0.2)] hover:opacity-95 hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0 cursor-pointer" id="ButtonBelisekarang">
                                Beli Sekarang
                                <!-- Panah yang akan bergeser maju saat cursor diletakkan di atas tombol -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                        </div>
                    `;
            document.getElementById('ButtonBelisekarang')
                ?.addEventListener('click', () => {
                    const isAddressIncomplete =
                        !primaryAddress ||
                        !primaryAddress.detail?.trim() ||
                        !primaryAddress.city?.trim() ||
                        !primaryAddress.district?.trim();
                    if (isAddressIncomplete) {
                        NotificationsToast('error', 'Alamat pengiriman belum lengkap! Silakan lengkapi terlebih dahulu.', 'top-start', 3000,)
                        return;
                    }
                    else if (user?.phone === "") {
                        NotificationsToast('error', 'Nomor Telepon tidak lengkap, Silakan lengkapi terlebih dahulu.', 'top-start', 3000,)
                        return;
                    }
                    else {
                        let data: RiwayatType = {
                            id: crypto.randomUUID(),
                            items: selectedItems.map((item) => ({ ...item })),
                            totalPrice: GrandTotal_All,
                            purchaseDate: new Date().toISOString(),
                            status: 'pending',
                        };

                        addToRiwayat(data);

                        cart = cart.filter((item => {
                            return !selectedItems.find(select => select.id === item.id)
                        }))
                        localStorage.setItem('swiftly_card', JSON.stringify(cart))
                        renderCart();

                        NotificationsToast(
                            'success',
                            'Pesanan Berhasil',
                            'top-start',
                            2000,
                        );
                    }

                    // Di sini kamu bisa lanjut jalankan fungsi pembayaran atau redirect halaman, contoh:
                    // window.location.href = "checkout_payment.html";
                });
        }

        function renderButton_Bottom(title: string, description: string, documentobject: HTMLElement, icon: string, img: string) {
            documentobject.innerHTML = `
                <div id="liat_keranjang_batas_cartProduct">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-gray-100 group transition-all duration-200 hover:bg-gray-50/50 px-3 rounded-2xl bg-[#f7f5f5] cursor-pointer">

                        <div class="flex items-center gap-4 min-w-0 flex-1">
                            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                                <img
                                    src=${img}
                                    alt="Alt" 
                                    class="max-w-full max-h-full object-contain p-1 rounded-2xl"
                                />
                            </div>
                            
                            <div class="min-w-0 flex-1">
                                <h3 class="font-semibold text-base sm:text-lg text-gray-900 truncate group-hover:text-secondary transition-colors duration-200">
                                    ${title}
                                </h3>
                                <p class="text-gray-500 text-xs">${description}</p>
                            </div>
                        </div>

                        <div class="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100/70">
                        <div class="flex items-center gap-2 bg-secondary p-1 rounded-xl">
                            <button class="btn-add px-2 font-bold cursor-pointer text-2xl text-white">${icon}</button>
                        </div>
                            
                            <div class="text-right">
                                <p class="text-[10px] text-gray-400 font-medium tracking-wider uppercase sm:hidden mb-0.5">Subtotal</p>
                                <p class="font-bold text-base sm:text-lg text-neutral tracking-tight">
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            tambahPesanan_produk_button?.addEventListener('click', () => {
                window.location.href = '/page/homePage.html#main';
            });
            RiwayatPemesanan_Page?.addEventListener('click', () => {
                window.location.href = '/page/riwayatPemesanan.html';
            });
        }

        function handleCartClick(e: Event) {
            const btn = (e.target as HTMLElement).closest('button');
            if (!btn) return;

            const id = btn.getAttribute('data-id');
            if (!id) return;

            const index = cart.findIndex((i) => String(i.id) === id);
            if (index === -1) return;

            const item = cart[index];
            const qty = item.quantity ?? 1;

            // tombol tambah
            if (btn.classList.contains('btn-add')) {
                cart[index].quantity = qty + 1;
            }

            // tombol kurang
            else if (btn.classList.contains('btn-less')) {
                if (qty > 1) {
                    cart[index].quantity = qty - 1;
                } else {
                    cart.splice(index, 1);
                }
            }

            // simpan & render ulang
            localStorage.setItem('swiftly_cart', JSON.stringify(cart));
            renderCart();
        }
        if (!(container as any)._cartBound) {
            container.addEventListener('click', handleCartClick);
            (container as any)._cartBound = true;
        }
    };

    // Initial render
    renderCart();
    function clearProduct() {
        // Clear cart
        const clearBtn = document.getElementById('clearCartBtn');
        if (!clearBtn) return;
        clearBtn.addEventListener('click', () => {
            clearCart();
            cart = [];
            renderCart();
        });
    }
}

initCartPage();
