import { initSearch } from "./ViewProduct/productView"
import { notification_Login_Register } from "./notifications_Element/Loginregister_Notification_Account";
import { getCurrentUser } from "../auth/authService";
import Swal from "sweetalert2";

const currentUser = getCurrentUser();

const el = document.getElementById("navbar")

const authSection = currentUser
  ? `
  <!-- Profile Button (Trigger Dropdown) -->
<button id="dropdownInformationButton"
    data-dropdown-toggle="dropdownInformation"
    class="flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
    type="button">

    <img src="${currentUser.image || "/icon/iconProfile.svg"}"
        alt="Profile"
        class="w-8 h-8 bg-secondary p-0.5 rounded-full">

    <p class="text-[14px] hover:text-secondary transition-all">
        ${currentUser.username}
    </p>

    <svg class="w-4 h-4 ml-1 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m19 9-7 7-7-7" />
    </svg>
</button>

<!-- Dropdown -->
<div id="dropdownInformation"
    class="z-10 hidden bg-white border border-slate-200 rounded-xl shadow-lg w-72">

    <!-- USER INFO -->
    <div class="p-3 border-b border-slate-100">
        <div class="flex items-center gap-3">

            <img src="${currentUser.image || "/icon/iconProfile.svg"}"
                class="w-9 h-9 rounded-full bg-secondary p-0.5">

            <div class="text-sm">
                <div class="font-medium text-slate-800">
                    ${currentUser.username}
                </div>
                <div class="text-slate-500 text-xs truncate">
                    ${currentUser.email}
                </div>
            </div>

        </div>
    </div>

    <!-- MENU -->
    <ul class="py-2 text-sm text-slate-600">

        <li>
            <a href="/page/accountDetail.html"
                class="flex items-center gap-2 px-3 py-2 hover:bg-slate-100">
                Account
            </a>
        </li>

        <li>
            <a href="/page/KeranjangProduk.html"
                class="flex items-center gap-2 px-3 py-2 hover:bg-slate-100">
                Keranjang
            </a>
        </li>

        <li>
            <a href="/page/wishlistProduk.html"
                class="flex items-center gap-2 px-3 py-2 hover:bg-slate-100">
                Wishlist
            </a>
        </li>

        <li>
            <a href="/page/riwayatPemesanan.html"
                class="flex items-center gap-2 px-3 py-2 hover:bg-slate-100">
                Riwayat Pemesanan
            </a>
        </li>

        <li class="border-t mt-1 pt-1">
            <a href="/page/settings.html"
                class="flex items-center gap-2 px-3 py-2 hover:bg-slate-100">
                Pengaturan
            </a>
        </li>

        <li>
            <button id="logoutBtn"
                class="w-full text-left flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-50 cursor-pointer">
                Sign out
            </button>
        </li>
    </ul>
</div>
  `
  : `
        <a href="/page/login_Account.html">
        <p class="cursor-pointer text-[13px] lg:text-[14px] transition-all hover:text-secondary">Masuk</p>
      </a>
        <a href="/page/register_Account.html">
            <div class="bg-secondary text-white px-4 lg:px-6 py-1 rounded-[7px] font-semibold cursor-pointer">
              <p class="text-[13px] lg:text-[14px]">Daftar</p>
            </div>
        </a>
  `

const authSection_handPhone = currentUser
  ? `
    <a href="/page/accountDetail.html">
      <div class="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        <img
          src="${currentUser.image || "/icon/iconProfile.svg"}"
          alt="Profile"
          class="w-10 h-10 bg-secondary p-0.5 rounded-full"
        >
        <span class="text-sm font-medium">
          ${currentUser.username}
        </span>
      </div>
    </a>
  `
  : `
    <div class="flex gap-3 px-4 py-4">
      <a href="/page/login_Account.html" class="flex-1">
        <p class="text-center border border-gray-300 rounded-[7px] py-2 text-[13px] cursor-pointer">
          Masuk
        </p>
      </a>

      <a href="/page/register_Account.html" class="flex-1">
        <div class="text-center bg-secondary text-white rounded-[7px] py-2 font-semibold text-[13px] cursor-pointer">
          Daftar
        </div>
      </a>
    </div>
  `;

if (el) {
  el.innerHTML =
    `
      <nav>
  <!-- Top Nav -->
  <div class="top-Nav bg-color_navigationbar_top flex items-center justify-between px-10 py-0.5 flex-wrap gap-1">
    <div class="left text-[12px] flex gap-2 items-center">
      <p class="font-light">Download di <a href=""><span class="text-secondary font-semibold">Aplikasi</span></a></p>
      <img src="/icon/handPhoneIcon.svg" alt="handphone" class="w-4">
    </div>
    <div class="right hidden md:flex gap-6 lg:gap-10 underline text-[11px]">
      <a href="">Tentang Swiftly</a>
      <a href="">Murah dan Diskon</a>
      <a href="">Pengantaran Cepat dan Mudah</a>
    </div>
  </div>

  <!-- Bottom Nav -->
  <div class="bottom-Nav px-4 md:px-6 lg:px-10 py-4 flex items-center gap-3 md:gap-5 flex-wrap md:flex-nowrap">
    <!-- Logo -->
    <div class="shrink-0 mr-0 md:mr-4 lg:mr-[3vw]">
      <img src="/images/swiftlyLogo_Black.png" alt="swiftlylogo.png" class="w-24 md:w-28 lg:w-30">
    </div>

    <!-- Searchbar -->
    <div class="w-full order-3 md:order-0 md:flex-1 relative">
  <div class="flex shadow-xs rounded-base">
    <input type="search" id="searchInput" class="px-3 py-2 bg-neutral-secondary-medium border border-default-medium text-heading text-sm focus:ring-brand focus:border-brand block w-full placeholder:text-body rounded-s-base" placeholder="Cari Produk" required>
    <button type="button" id="searchBtn" class="inline-flex items-center text-white bg-secondary  border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium rounded-e-base text-sm px-3 md:px-4 py-2 focus:outline-none">
      <svg class="w-4 h-4 md:me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
      </svg>
    </button>
  </div>

  <div id="searchResult" class="absolute top-full left-0 right-0 mt-1 z-50 hidden bg-white border border-gray-200 rounded-base shadow-lg overflow-y-auto">
  </div>
</div>
    <!-- Icons + Auth (desktop) -->
    <div class="hidden md:flex items-center gap-4 lg:gap-5 shrink-0 ml-0 lg:ml-[3vw] lg:mr-11 cursor-pointer">
      <div class="flex gap-5 lg:gap-7">
          <img src="/icon/Pembelian.svg" alt="keranjang" class="w-5 lg:w-6 transition-all hover:scale-105" id="pembelianKeranjang">
          <img src="/icon/Suka.svg" alt="like" class="w-5 lg:w-6 transition-all hover:scale-105" id="wishlist_daftar">
      </div>
      <div class="flex items-center gap-3 lg:gap-5">
        ${authSection}
      </div>
    </div>

    <!-- Hamburger (mobile) -->
    <button id="hamburger" class="md:hidden ml-auto shrink-0 p-1" onclick="document.getElementById('mobileMenu').classList.toggle('hidden')" aria-label="Buka menu">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
  </div>

  <!-- Mobile Menu -->
  <div id="mobileMenu" class="hidden md:hidden border-t border-gray-200 flex-col cursor-pointer">
    <div class="flex items-center gap-4 px-4 py-3 border-b border-gray-100">
      <img src="/icon/Pembelian.svg" alt="keranjang" class="w-5" id="pembelianKeranjang_Handphone">
      <span class="text-sm">Pembelian</span>
    </div>
    <div class="flex items-center gap-4 px-4 py-3 border-b border-gray-100 cursor-pointer">
      <img src="/icon/Suka.svg" alt="like" class="w-5" id="wishlist_daftar_handphone">
      <span class="text-sm">Favorit</span>
    </div>
    <div class="flex items-center gap-4 px-4 py-3 border-b border-gray-100 cursor-pointer">
      <img src="/icon/Suka.svg" alt="like" class="w-5" id="riwayatPembayaran">
      <span class="text-sm">Riwayat Pembayaran</span>
    </div>
    
    <div class="flex gap-3 px-4 py-4">
    ${authSection_handPhone}
    </div>
  </div>
</nav>
      `
  initSearch()
}

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  Swal.fire({
    title: "Yakin mau keluar?",
    text: "Kamu harus login lagi untuk masuk ke akun ini",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, logout",
    cancelButtonText: "Batal",
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280"
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("swiftly_session");
      window.location.href = "index.html";
    }
  });
});

function checkLoginAndRedirect(url: string) {
  if (currentUser) { window.location.href = url; }
  else { notification_Login_Register() }
}

document.getElementById("pembelianKeranjang")?.addEventListener("click", () => {
  checkLoginAndRedirect("/page/KeranjangProduk.html");
});
document.getElementById("pembelianKeranjang_Handphone")?.addEventListener("click", () => {
  checkLoginAndRedirect("/page/KeranjangProduk.html");
});

document.getElementById("wishlist_daftar")?.addEventListener("click", () => {
  checkLoginAndRedirect("/page/wishlistProduk.html");
});
document.getElementById("wishlist_daftar_handphone")?.addEventListener("click", () => {
  checkLoginAndRedirect("/page/wishlistProduk.html");
});


