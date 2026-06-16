import Swal from "sweetalert2";

const el = document.getElementById("footer_Web");
if (el) {
    el.innerHTML = `
    <footer class="bg-blue-100 text-gray-400 pt-14 pb-6 px-6 md:px-10 lg:px-16">

        <!-- Top Section -->
        <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-10 border-b border-gray-800">

            <!-- Brand -->
            <div class="col-span-2 md:col-span-4 lg:col-span-1">
                <img src="/images/swiftlyLogo_Black.png" alt="Swiftly" class="h-7  mb-4"/>
                <p class="text-xs leading-relaxed text-neutral max-w-55">
                    Belanja lebih cepat, lebih hemat, lebih mudah — semua ada di Swiftly.
                </p>
                <div class="flex gap-3 mt-5">
                    <a href="" class="w-8 h-8 rounded-full border border-neutral flex items-center justify-center transition-colors">
                        <svg class="w-3.5 h-3.5" fill="black" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="" class="w-8 h-8 rounded-full border border-neutral flex items-center justify-center transition-colors">
                        <svg class="w-3.5 h-3.5" fill="black" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="" class="w-8 h-8 rounded-full border border-neutral flex items-center justify-center transition-colors">
                        <svg class="w-3.5 h-3.5" fill="black" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>
                    </a>
                </div>
            </div>

            <!-- Perusahaan -->
            <div class="text-neutral">
                <p class=" text-sm font-semibold mb-4">Perusahaan</p>
                <ul class="space-y-2.5 text-xs">
                    <li><a href="" class=" transition-colors">Tentang Swiftly</a></li>
                    <li><a href="" class=" transition-colors">Karir</a></li>
                    <li><a href="" class=" transition-colors">Blog</a></li>
                    <li><a href="" class=" transition-colors">Kebijakan Privasi</a></li>
                    <li><a href="" class=" transition-colors">Syarat & Ketentuan</a></li>
                </ul>
            </div>

            <!-- Layanan -->
            <div class="text-neutral">
                <p class="text-sm font-semibold mb-4">Layanan</p>
                <ul class="space-y-2.5 text-xs">
                    <li><a href="" class="transition-colors">Pusat Bantuan</a></li>
                    <li><a href="" class="transition-colors">Cara Berbelanja</a></li>
                    <li><a href="" class="transition-colors">Pengiriman</a></li>
                    <li><a href="" class="transition-colors">Pengembalian</a></li>
                    <li><a href="" class="transition-colors">Hubungi Kami</a></li>
                </ul>
            </div>

            <!-- Download -->
            <div>
                <p class="text-neutral text-sm font-semibold mb-4">Unduh Aplikasi</p>
                <div class="flex flex-col gap-2">
                    <a href="" class="flex items-center gap-2.5 border border-neutral rounded-lg px-3 py-2  transition-colors">
                        <svg class="w-6 h-6 shrink-0" fill="black" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                        <div class="flex flex-col gap-1">
                            <p class="text-[9px] text-neutral leading-none">Download di</p>
                            <p class="text-xs text-neutral font-medium">App Store</p>
                        </div>
                    </a>
                    <a href="" class="flex items-center gap-2.5 border border-neutral rounded-lg px-3 py-2  transition-colors">
                        <svg class="w-5 h-5 shrink-0" fill="black" viewBox="0 0 24 24"><path d="M3.18 23.76c.3.17.64.22.99.14l12.12-6.99-2.54-2.54-10.57 9.39zM.54 1.73C.2 2.07 0 2.6 0 3.28v17.44c0 .68.2 1.21.55 1.55l.08.08 9.76-9.76v-.22L.62 1.65l-.08.08zM20.4 10.7l-2.67-1.54-2.84 2.84 2.84 2.84 2.68-1.55c.77-.44.77-1.16-.01-1.59zM3.18.24L15.75 7.6l-2.54 2.54L3.18.24z"/></svg>
                        <div class="flex flex-col gap-1">
                            <p class="text-[9px] text-neutral leading-none">Download di</p>
                            <p class="text-xs text-neutral font-medium">Google Play</p>
                        </div>
                    </a>
                </div>
            </div>

            <!-- Newsletter -->
            <div>
                <p class="text-neutral text-sm font-semibold mb-4">Newsletter</p>
                <p class="text-xs text-neutral mb-3 leading-relaxed">Dapatkan promo dan produk terbaru langsung di inbox kamu.</p>
                <div class="flex gap-2">
                    <input
                        id="input_NewsLatter"
                        type="email"
                        placeholder="Example@gmail.com"
                        class="flex-1 bg-white rounded-lg px-3 py-2 text-xs text-black placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-colors min-w-0"
                    />
                    <button class="bg-white text-gray-950 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors shrink-0" id="Button_Newsletter">
                        Daftar
                    </button>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 pt-6 text-xs text-neutral">
            <p>© 2025 Swiftly. Seluruh hak dilindungi.</p>
            <div class="flex items-center gap-4">
                <a href="" class=" transition-colors">Privasi</a>
                <a href="" class=" transition-colors">Ketentuan</a>
                <a href="" class=" transition-colors">Cookie</a>
            </div>
        </div>

    </footer>
    `;
}

function NewsLatter() {
    const input_NewsLatter = document.getElementById("input_NewsLatter") as HTMLInputElement
    const Button_Newsletter = document.getElementById("Button_Newsletter") as HTMLButtonElement
    Button_Newsletter.addEventListener("click", () => {
        const email = input_NewsLatter.value
        if (!email) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Masukkan email terlebih dahulu!",
            });
            return;
        }
        Swal.fire({
            title: "Selesai",
            text: "Email Terdaftar",
            icon: "success"
        });
        input_NewsLatter.value = ""
    })
}
NewsLatter()