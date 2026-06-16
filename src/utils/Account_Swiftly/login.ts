// login.ts — Swiftly
//
// localStorage yang dipakai:
//   'swiftly_users'   → array semua user yang sudah daftar
//   'swiftly_session' → data user yang sedang login
//   'swiftly_remember'→ email yang disimpan untuk remember me

import { homePageNav } from "../../navigation/homePageNavigate";
import { hash } from "../hashPw";
import { getUsers } from "../../auth/GetAllAccount";
import { el } from "../dom_Login_Register";
import { showAlert } from "../../components/notifications_Element/AlertNotification_in_LoginRegister";
import { showError } from "../../components/notifications_Element/AlertNotification_in_LoginRegister";

// ─────────────────────────────────────────────────────────────
// Seed akun demo supaya ada data awal untuk testing
// ─────────────────────────────────────────────────────────────
const users = getUsers();
if (!users.some(u => u.email === 'demo@swiftly.id')) {
    users.push({
        id: "USR_DEMO_001",
        name: 'Demo User',
        username: 'demouser',
        email: 'demo@swiftly.id',
        passwordHash: hash('swiftly123'),

        image: "/images/default-user.png",
        phone: "08123456789",
        birthDate: "2000-01-01",
        gender: "male",

        addresses: [
            {
                id: "ADDR_DEMO_001",
                label: "",

                phone: "08123456789",

                province: "Jawa Barat",
                city: "Bandung",
                district: "Coblong",

                postalCode: "40132",

                detail: "Jl. Contoh No. 123",

                isPrimary: true
            }
        ],

        createdAt: new Date().toISOString()
    });

    localStorage.setItem('swiftly_users', JSON.stringify(users));
}

// ─────────────────────────────────────────────────────────────
// Isi email otomatis kalau remember me pernah dicentang
// ─────────────────────────────────────────────────────────────
const savedEmail = localStorage.getItem('swiftly_remember');
if (savedEmail) {
    el<HTMLInputElement>('email').value = savedEmail;
    el<HTMLInputElement>('remember_me').checked = true;
}

// ─────────────────────────────────────────────────────────────
// Tombol show / hide password
// ─────────────────────────────────────────────────────────────
el('toggle_pw').addEventListener('click', () => {
    const pw = el<HTMLInputElement>('password');
    const isHidden = pw.type === 'password';
    pw.type = isHidden ? 'text' : 'password';
    el('icon_eye_open').classList.toggle('hidden', isHidden);
    el('icon_eye_closed').classList.toggle('hidden', !isHidden);
});

// ─────────────────────────────────────────────────────────────
// Submit form login
// ─────────────────────────────────────────────────────────────
el('login_form').addEventListener('submit', async (e) => {
    e.preventDefault();
    el('alert_box').className = 'hidden';

    const email = el<HTMLInputElement>('email').value.trim();
    const password = el<HTMLInputElement>('password').value;
    const remember = el<HTMLInputElement>('remember_me').checked;

    // Validasi input
    const emailOk = showError('email', 'email_error', !email ? 'Email wajib diisi.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Format email tidak valid.' : null);
    const pwOk = showError('password', 'password_error', !password ? 'Password wajib diisi.' : null);
    if (!emailOk || !pwOk) return;

    // Cari user berdasarkan email
    const user = getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
        showError('email', 'email_error', 'Email tidak terdaftar.');
        return showAlert('Email tidak terdaftar.', 'error');
    }

    if (user.passwordHash !== hash(password)) {
        showError('password', 'password_error', 'Password tidak sesuai.');
        return showAlert('Password salah.', 'error');
    }

    // Simpan session — struktur sama dengan yang dibuat register.ts
    const session = JSON.stringify({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email
    });
    remember
        ? localStorage.setItem('swiftly_session', session)    // tetap ada walau tab ditutup
        : sessionStorage.setItem('swiftly_session', session); // hilang saat tab ditutup

    // Simpan / hapus remember me
    remember
        ? localStorage.setItem('swiftly_remember', email)
        : localStorage.removeItem('swiftly_remember');

    showAlert(`Selamat datang, ${user.name}! 👋`, 'success');
    homePageNav('/page/homePage.html')
});