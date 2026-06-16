import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export function notification_Login_Register() {
  Swal.fire({
    title: "Login Diperlukan",
    icon: "warning",

    html: `
    <div class="text-center">
      <p>
        Anda harus login terlebih dahulu untuk mengakses fitur ini.
      </p>

      <p class="mt-2 text-sm text-gray-500">
        Belum punya akun? Daftar sekarang dan mulai berbelanja.
      </p>
    </div>
  `,

    showCloseButton: true,
    showDenyButton: true,

    confirmButtonText: "Masuk",
    denyButtonText: "Daftar",

    buttonsStyling: false,

    customClass: {
      popup: "rounded-2xl",
      title: "text-xl font-bold",
      htmlContainer: "text-gray-600",
      closeButton: "text-gray-400 hover:text-gray-700",

      actions: "gap-3 mt-5",

      confirmButton:
        "bg-secondary text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition-all cursor-pointer",

      denyButton:
        "bg-white text-secondary border border-secondary px-5 py-2 rounded-lg font-medium hover:bg-orange-50 transition-all cursor-pointer",
    },

    focusConfirm: false,
  })
    .then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/page/login_Account.html";
      }

      if (result.isDenied) {
        window.location.href = "/page/register_Account.html";
      }
    });
}