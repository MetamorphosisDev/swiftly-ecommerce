const el = document.getElementById("navbar")
if (el) {
  el.innerHTML =
    `
      <nav>
            <!-- Top Nav -->
            <div class="top-Nav bg-color_navigationbar_top flex items-center justify-between px-10 py-0.5">
              <div class="left text-[14px]">
                <p class="font-light">Download di <a href=""><span class="text-secondary font-semibold">Aplikasi</span></a></p>
              </div>
              <div class="right">
                <div class="flex gap-10 underline text-[12px]">
                  <a href="">Tentang Swiftly</a>
                  <a href="">Murah dan Diskon</a>
                  <a href="">Pengantaran Cepat dan Mudah</a>
                </div>
              </div>
            </div>

            <!-- Bottom Nav -->
            <div class="bottom-Nav px-10 py-7 flex items-center gap-6">
              <!-- Logo -->
              <div class="shrink-0 mr-[3vw]">
                <img src="public/images/swiftlyLogo_Black.png" alt="swiftlylogo.png" class="w-30">
              </div>

              <!-- Searchbar -->
              <div class="flex-1">
                <div class="flex items-center bg-color_searchbar rounded-[7px] px-7 py-1">
                  <input type="text" placeholder="Cari produk..." class="w-full h-full px-4 outline-none text-gray-700 placeholder:text-gray-400 text-xs"/>
                  <div class="flex items-center gap-5">
                    <div class="h-6 w-1 bg-graybar"></div>
                    <img src="/public/icon/Search.svg" alt="search" class="w-5">
                  </div>
                </div>
              </div>


              <div class="flex items-center gap-5 shrink-0 ml-[3vw] mr-11">
                <div class="flex gap-7">
                  <img src="public/icon/Pembelian.svg" alt="keranjang" class="w-6">
                  <img src="public/icon/Suka.svg" alt="like" class="w-6">
                </div>
                <div class="flex items-center gap-5">
                  <p class="cursor-pointer text-[14px]">Masuk</p>
                  <div class="bg-secondary text-white px-6 py-1 rounded-[7px] font-semibold cursor-pointer">
                    <p class="text-[14px]">Daftar</p>
                  </div>
                </div>
              </div>

            </div>

          </nav>
      `
}





