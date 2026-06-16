// Tampilkan / sembunyikan error pada input
import { el } from "../../utils/dom_Login_Register";
export function showError(inputId: string, errId: string, msg: string | null): boolean {
    const input = el<HTMLInputElement>(inputId);
    const errEl = el(errId);
    if (msg) {
        input.classList.add('error');
        errEl.textContent = msg;
        errEl.classList.remove('hidden');
        return false;
    }
    input.classList.remove('error');
    errEl.classList.add('hidden');
    return true;
}

// Tampilkan alert box
export function showAlert(msg: string, type: 'error' | 'success') {
    const box = el('alert_box');
    box.textContent = msg;
    box.className = `mb-4 px-4 py-3 rounded-xl text-sm font-medium ${type === 'error'
        ? 'bg-red-50 text-red-600 border border-red-200'
        : 'bg-green-50 text-green-700 border border-green-200'
        }`;
}