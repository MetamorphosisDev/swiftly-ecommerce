import Swal, { type SweetAlertIcon, type SweetAlertPosition } from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export function NotificationsToast(icon_str: SweetAlertIcon, title_str: string, position_str: SweetAlertPosition, timer_str: number) {
    Swal.mixin({
        toast: true,
        position: position_str,
        showConfirmButton: false,
        timer: timer_str,
        timerProgressBar: true,

        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            const progressBar = toast.querySelector(".swal2-timer-progress-bar") as HTMLElement | null;
            if (progressBar) {
                progressBar.style.background = "#3b82f6";
            }
        }
    }).fire({
        icon: icon_str,
        title: title_str
    });
}