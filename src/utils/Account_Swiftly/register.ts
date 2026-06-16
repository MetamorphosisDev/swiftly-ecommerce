// register.ts — Swiftly
//
// localStorage yang dipakai:
//   'swiftly_users'   → array semua user yang sudah daftar
//   'swiftly_session' → data user yang sedang login (auto-login setelah daftar)

// Struktur user — HARUS SAMA dengan login.ts

import { homePageNav } from "../../navigation/homePageNavigate";
import type { UserRecord } from "../../data/TypeData_Object/AccountSwiftly_Type";
import { hash } from "../hashPw";
import { getUsers } from "../../auth/GetAllAccount";
import { el } from "../dom_Login_Register";
import { showAlert } from "../../components/notifications_Element/AlertNotification_in_LoginRegister";
import { showError } from "../../components/notifications_Element/AlertNotification_in_LoginRegister";



// ─────────────────────────────────────────────────────────────
// Tombol show / hide password & konfirmasi password
// ─────────────────────────────────────────────────────────────
function eyeToggle(btnId: string, inputId: string, openId: string, closedId: string) {
    el(btnId).addEventListener('click', () => {
        const input = el<HTMLInputElement>(inputId);
        const isHidden = input.type === 'password';
        input.type = isHidden ? 'text' : 'password';
        el(openId).classList.toggle('hidden', isHidden);
        el(closedId).classList.toggle('hidden', !isHidden);
    });
}

eyeToggle('toggle_pw', 'password', 'icon_eye_open', 'icon_eye_closed');
eyeToggle('toggle_cpw', 'confirm_password', 'icon_eye_open_c', 'icon_eye_closed_c');

// ─────────────────────────────────────────────────────────────
// Password strength bar
// ─────────────────────────────────────────────────────────────
el('password').addEventListener('input', () => {
    const pw = el<HTMLInputElement>('password').value;

    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    score = Math.min(score, 4);

    const colors = ['#e5e7eb', '#ef4444', '#f97316', '#eab308', '#22c55e'];
    const labels = ['', 'Lemah', 'Cukup', 'Kuat', 'Sangat kuat'];

    for (let i = 1; i <= 4; i++) {
        const bar = el<HTMLDivElement>(`strength_bar_${i}`);
        bar.style.width = i <= score ? '100%' : '0%';
        bar.style.backgroundColor = i <= score ? colors[score] : '#e5e7eb';
    }
    el('strength_label').textContent = labels[score];
    (el('strength_label') as HTMLElement).style.color = colors[score];
});

// ─────────────────────────────────────────────────────────────
// Submit form register
// ─────────────────────────────────────────────────────────────
el('register_form').addEventListener('submit', async (e) => {
    e.preventDefault();
    el('alert_box').className = 'hidden';

    // 1. Ambil data
    const name = el<HTMLInputElement>('fullname').value.trim();
    const username = el<HTMLInputElement>('username').value.trim();
    const email = el<HTMLInputElement>('email').value.trim();
    const pw = el<HTMLInputElement>('password').value;
    const cpw = el<HTMLInputElement>('confirm_password').value;
    const agreed = el<HTMLInputElement>('agree_terms').checked;

    const users = getUsers();

    // 2. Validasi field teks
    const allOk = [
        showError('fullname', 'fullname_error', !name ? 'Nama wajib diisi.' : null),
        showError('username', 'username_error', !username ? 'Username wajib diisi.' : users.some(u => u.username === username) ? 'Username sudah dipakai.' : null),
        showError('email', 'email_error', !email ? 'Email wajib diisi.' : users.some(u => u.email.toLowerCase() === email.toLowerCase()) ? 'Email sudah terdaftar.' : null),
        showError('password', 'password_error', !pw ? 'Password wajib diisi.' : pw.length < 8 ? 'Minimal 8 karakter.' : null),
        showError('confirm_password', 'confirm_password_error', pw !== cpw ? 'Password tidak cocok.' : null),
    ].every(Boolean);

    // 3. Validasi Terms & Condition (PENTING: Cek sebelum push data)
    const termsEl = el('terms_error');
    if (!agreed) {
        termsEl.textContent = 'Kamu harus menyetujui syarat & ketentuan.';
        termsEl.classList.remove('hidden');
        return; // Hentikan di sini jika belum setuju
    }
    termsEl.classList.add('hidden');

    if (!allOk) return;

    // 4. Proses simpan
    const newUser: UserRecord = {
        id: crypto.randomUUID(),
        name,
        username,
        email,
        passwordHash: hash(pw),
        image: "",
        phone: "",
        birthDate: "",
        gender: "",
        addresses: [],
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('swiftly_users', JSON.stringify(users));

    // 5. Simpan ke localStorage agar konsisten dengan login.ts
    const session = JSON.stringify({ id: newUser.id, name, username, email });
    localStorage.setItem('swiftly_session', session);

    showAlert(`Akun berhasil dibuat!`, 'success');
    homePageNav('/page/homePage.html');
});