import { initSearch } from "./productView"
const el = document.getElementById("navbar")
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
    <input type="search" id="searchInput" class="px-3 py-2 bg-neutral-secondary-medium border border-default-medium text-heading text-sm focus:ring-brand focus:border-brand block w-full placeholder:text-body rounded-s-base" placeholder="Cari produk" required>
    <button type="button" id="searchBtn" class="inline-flex items-center text-white bg-secondary hover:bg-brand-strong border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium rounded-e-base text-sm px-3 md:px-4 py-2 focus:outline-none">
      <svg class="w-4 h-4 md:me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
      </svg>
      <span class="hidden md:inline">Cari</span>
    </button>
  </div>

  <div id="searchResult" class="absolute top-full left-0 right-0 mt-1 z-50 hidden bg-white border border-gray-200 rounded-base shadow-lg overflow-hidden">
  </div>
</div>

    <!-- Icons + Auth (desktop) -->
    <div class="hidden md:flex items-center gap-4 lg:gap-5 shrink-0 ml-0 lg:ml-[3vw] lg:mr-11">
      <div class="flex gap-5 lg:gap-7">
        <img src="/icon/Pembelian.svg" alt="keranjang" class="w-5 lg:w-6">
        <img src="/icon/Suka.svg" alt="like" class="w-5 lg:w-6">
      </div>
      <div class="flex items-center gap-3 lg:gap-5">
        <p class="cursor-pointer text-[13px] lg:text-[14px]">Masuk</p>
        <div class="bg-secondary text-white px-4 lg:px-6 py-1 rounded-[7px] font-semibold cursor-pointer">
          <p class="text-[13px] lg:text-[14px]">Daftar</p>
        </div>
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
  <div id="mobileMenu" class="hidden md:hidden border-t border-gray-200 flex-col">
    <div class="flex items-center gap-4 px-4 py-3 border-b border-gray-100">
      <img src="/icon/Pembelian.svg" alt="keranjang" class="w-5">
      <span class="text-sm">Pembelian</span>
    </div>
    <div class="flex items-center gap-4 px-4 py-3 border-b border-gray-100">
      <img src="/icon/Suka.svg" alt="like" class="w-5">
      <span class="text-sm">Favorit</span>
    </div>
    <a href="" class="px-4 py-3 text-sm border-b border-gray-100 underline">Tentang Swiftly</a>
    <a href="" class="px-4 py-3 text-sm border-b border-gray-100 underline">Murah dan Diskon</a>
    <a href="" class="px-4 py-3 text-sm border-b border-gray-100 underline">Pengantaran Cepat dan Mudah</a>
    <div class="flex gap-3 px-4 py-4">
      <p class="flex-1 text-center border border-gray-300 rounded-[7px] py-2 text-[13px] cursor-pointer">Masuk</p>
      <div class="flex-1 text-center bg-secondary text-white rounded-[7px] py-2 font-semibold text-[13px] cursor-pointer">Daftar</div>
    </div>
  </div>
</nav>
      `
  initSearch()
}








