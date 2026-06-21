import { getCurrentUser } from '../auth/authService';
import type { UserRecord } from '../data/TypeData_Object/AccountSwiftly_Type';
import { List_ProvinsiIndonesia } from '../constants/provinsiIndonesia';
import { NotificationsToast } from '../components/notifications_Element/productToast_product_Notification';
import { formatDateID } from '../utils/DateTime/DateFormatter';

let isEditing = false;

const maxDate = new Date(
    new Date().getFullYear() - 16,
    new Date().getMonth(),
    new Date().getDate()
).toISOString().split('T')[0];

function getFullUserData(): UserRecord {
    const session: UserRecord = getCurrentUser();
    const allUsers: UserRecord[] = JSON.parse(localStorage.getItem('swiftly_users') || '[]',);

    const foundUser = allUsers.find((u) => u.id === session?.id);
    return (
        foundUser || {
            id: session.id || '',
            name: session.name || '',
            username: session.username || '',
            email: session.email || '',
            passwordHash: '',

            phone: session.phone || '',
            birthDate: session.birthDate || '',
            gender: '',

            addresses: [],
            createdAt: '',

            updatedAt: ''
        }
    );
}

function renderProfile() {
    const container = document.getElementById('Main_Account_Detail');
    if (!container) return;

    const userData = getFullUserData();
    const primaryAddress =
        userData.addresses?.find((a) => a.isPrimary) || userData.addresses?.[0];

    const provOptions = List_ProvinsiIndonesia.map(
        (prov) =>
            `<option value="${prov}" ${primaryAddress?.province === prov ? 'selected' : ''}>${prov}</option>`,
    ).join('');

    container.innerHTML = `
                    <div class="min-h-screen bg-slate-50/80 px-4 pb-10 pt-5">
                        <form id="profileForm" class="mx-auto max-w-5xl space-y-6">

                            <div class="flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                                <div>
                                    <h1 class="text-2xl font-bold tracking-tight text-slate-900">Profil Akun</h1>
                                    <p class="mt-1 text-sm text-slate-500">Kelola identitas, kontak, dan alamat pengiriman.</p>
                                    ${isEditing
            ? `<p class="text-xs text-gray-400 py-1">
                                        ${isEditing ? `Terakhir Diperbarui: <span class="font-bold">${formatDateID(userData.updatedAt)}</span>` : ''}
                                    </p>`
            : ''
        }

                                </div>
                                <button
                                    type="button"
                                    id="toggleEditBtn"
                                    class="rounded-full px-4 py-2 text-sm font-semibold transition cursor-pointer 
                                        ${isEditing
            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            : 'text-secondary hover:opacity-90 hover:underline'
        }"
                                >
                                    ${isEditing ? 'Batal Edit' : 'Edit Profil'}
                                </button>
                            </div>

                            <div class="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">

                                <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div class="flex flex-col items-center text-center">
                                        <div class="relative group">
                                            <img
                                                id="profile_preview"
                                                src="${userData.image || '/icon/iconProfile.svg'}"
                                                alt="Profile"
                                                class="h-24 w-24 rounded-full border border-slate-200 object-cover shadow-sm bg-secondary"
                                            />
                                            ${isEditing
            ? `
                                                        <label class="absolute bottom-0 right-0 cursor-pointer rounded-full bg-secondary p-2 border-2 border-white transition hover:scale-105">
                                                            <input type="file" id="edit_image" accept="image/*" class="hidden" />
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                            </svg>
                                                        </label>
                                                    `
            : ''
        }
                                        </div>

                                        <div class="mt-4 w-full">
                                            ${isEditing
            ? `
                                                        <input
                                                            id="edit_name"
                                                            type="text"
                                                            value="${userData.name || ''}"
                                                            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-lg font-semibold text-slate-900 outline-none transition focus:border-secondary focus:bg-white"
                                                            placeholder="Nama lengkap"
                                                        />
                                                    `
            : `
                                                        <h2 class="text-xl font-bold text-slate-900">${userData.name || '-'}</h2>
                                                        <p class="mt-1 text-sm text-slate-500">@${userData.username || '-'}</p>
                                                    `
        }
                                        </div>

                                        <div class="mt-5 w-full rounded-2xl bg-slate-50 px-4 py-3 text-left">
                                            <p class="text-[11px] font-bold uppercase tracking-widest text-slate-400">Email</p>
                                            <p class="mt-1 truncate text-sm font-medium text-slate-700">${userData.email || '-'}</p>
                                        </div>

                                        <div class="mt-4 w-full rounded-2xl bg-slate-50 px-4 py-3 text-left">
                                            <p class="text-[11px] font-bold uppercase tracking-widest text-slate-400">Bergabung</p>
                                            <p class="mt-1 text-sm font-medium text-slate-700">
                                                ${userData.createdAt ? formatDateID(userData.createdAt) : ''}
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <section class="space-y-6">
                                    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                        <div class="mb-5 flex items-center justify-between">
                                            <h3 class="text-base font-bold text-slate-900">Informasi Pribadi</h3>
                                            <span class="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Detail
                                            </span>
                                        </div>

                                        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div class="class data rounded-2xl border border-slate-100 bg-slate-50 p-4">
                                                <p class="text-[11px] font-bold uppercase tracking-widest text-slate-400">Telepon</p>
                                                ${isEditing
            ? `
                                                            <input
                                                                id="edit_phone"
                                                                type="text"
                                                                inputmode="numeric"
                                                                minlength="9"
                                                                maxlength="11"
                                                                value="${userData.phone || ''}"
                                                                placeholder="876xxxxxxxx"
                                                                class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary"
                                                            />
                                                        `
            : `
                                                            <p class="mt-2 text-sm font-semibold text-slate-800">
                                                                ${userData.phone ? `(+62) ${userData.phone}` : '-'}
                                                            </p>
                                                        `
        }
                                            </div>
                                               <div class="class data rounded-2xl border border-slate-100 bg-slate-50 p-4">
                                                <p class="text-[11px] font-bold uppercase tracking-widest text-slate-400">Tanggal Lahir</p>
                                                ${isEditing
            ? `
                                                            <input
                                                                id="edit_tanggalLahir"
                                                                type="date"
                                                                min="1950-01-01"
                                                                max=${maxDate}
                                                                value="${userData.birthDate || ''}"
                                                                class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary"
                                                            />
                                                        `
            : `
                                                            <p class="mt-2 text-sm font-semibold text-slate-800">
                                                                ${userData.birthDate ? `${userData.birthDate}` : '-'}
                                                            </p>
                                                        `
        }
                                            </div>
                                            

                                            <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                                                <p class="text-[11px] font-bold uppercase tracking-widest text-slate-400">Gender</p>
                                                ${isEditing
            ? `
                                                            <select
                                                                id="edit_gender"
                                                                class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary cursor-pointer"
                                                            >
                                                                <option value="" disabled ${!userData.gender ? 'selected' : ''}>Pilih gender</option>
                                                                <option value="pria" ${userData.gender === 'pria' ? 'selected' : ''}>Pria</option>
                                                                <option value="wanita" ${userData.gender === 'wanita' ? 'selected' : ''}>Wanita</option>
                                                                <option va22121lue="-" ${userData.gender === '-' ? 'selected' : ''}>Tidak memberi tahu</option>
                                                            </select>
                                                        `
            : `
                                                            <p class="mt-2 text-sm font-semibold capitalize text-slate-800">
                                                                ${userData.gender || '-'}
                                                            </p>
                                                        `
        }
                                                
                                            </div>
                                        </div>
                                    </div>

                                    <div class="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                                        <div class="mb-5 flex items-center justify-between">
                                            <h3 class="text-base font-bold text-slate-900">Alamat Utama</h3>
                                        </div>

                                        ${isEditing
            ? `
                                                    <div class="grid gap-4">
                                                        <input
                                                            id="addr_label"
                                                            value="${primaryAddress?.label || ''}"
                                                            placeholder="Label alamat (Ex: Rumah, Kantor, Gedung)"
                                                            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-secondary focus:bg-white"
                                                        />

                                                        <textarea
                                                            id="addr_detail"
                                                            rows="3"
                                                            placeholder="Detail alamat"
                                                            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-secondary focus:bg-white"
                                                        >${primaryAddress?.detail || ''}</textarea>

                                                        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                            <input
                                                                id="addr_city"
                                                                value="${primaryAddress?.city || ''}"
                                                                placeholder="Kota"
                                                                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-secondary focus:bg-white"
                                                            />

                                                            <input
                                                                id="addr_district"
                                                                value="${primaryAddress?.district || ''}"
                                                                placeholder="Kecamatan"
                                                                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-secondary focus:bg-white"
                                                            />
                                                        </div>

                                                        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                            <select
                                                                id="addr_province"
                                                                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-secondary focus:bg-white"
                                                            >
                                                                <option value="" ${!primaryAddress?.province ? 'selected' : ''}>Pilih provinsi</option>
                                                                ${provOptions}
                                                            </select>

                                                            <input
                                                                type="text"
                                                                maxlength="5"
                                                                id="addr_postalCode"
                                                                value="${primaryAddress?.postalCode || ''}"
                                                                placeholder="Kode pos"
                                                                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-secondary focus:bg-white"
                                                            />
                                                        </div>
                                                    </div>
                                                `
            : `
                                                    <div class="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                                        ${primaryAddress
                ? `
                                                                    <p class="text-sm font-semibold text-slate-900">${primaryAddress.label || 'Belum ada Label'}</p>
                                                                    <p class="mt-2 text-sm leading-relaxed text-slate-600">${primaryAddress.detail || 'Detail: -'}</p>
                                                                    <p class="mt-3 text-sm text-slate-500">
                                                                        Kecamatan ${primaryAddress.district || '-'}, Kota ${primaryAddress.city || '-'}<br>
                                                                        Provinsi ${primaryAddress.province || '-'}, Kode Pos ${primaryAddress.postalCode || '-'}
                                                                    </p>
                                                                `
                : `
                                                                    <p class="text-sm text-slate-500">Belum ada alamat tersimpan.</p>
                                                                `
            }
                                                    </div>
                                                `
        }
                                    </div>

                                    <div class="flex justify-end">
                                        ${isEditing
            ? `
                                                    <button
                                                        type="submit"
                                                        class="rounded-2xl bg-secondary px-6 py-3 text-sm font-bold text-white transition hover:opacity-90 cursor-pointer"
                                                    >
                                                        Simpan Perubahan
                                                    </button>
                                                `
            : `
                                                    <button
                                                        type="button"
                                                        id="logoutBtn"
                                                        class="px-6 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 cursor-pointer hover:underline"
                                                    >
                                                        Keluar Akun
                                                    </button>
                                                `
        }
                                    </div>
                                </section>
                            </div>
                        </form>
                    </div>
                `;

    setupEventListeners();
}

function setupEventListeners(): void {
    const imgInput = document.getElementById("edit_image") as HTMLInputElement | null;
    const toggleEditBtn = document.getElementById("toggleEditBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const profileForm = document.getElementById("profileForm") as HTMLFormElement | null;

    imgInput?.addEventListener("change", () => {
        const file = imgInput.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const preview = document.getElementById("profile_preview") as HTMLImageElement | null;
            if (!preview) return;
            preview.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    });

    toggleEditBtn?.addEventListener("click", () => {
        isEditing = !isEditing;
        renderProfile();
    });

    logoutBtn?.addEventListener("click", () => {
        localStorage.removeItem("swiftly_session");
        window.location.href = "index.html";
    });

    profileForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        saveUserData();
    });
}

function saveUserData() {
    const session = getCurrentUser();
    if (!session) return alert('Sesi tidak valid!');

    const allUsers: UserRecord[] = JSON.parse(
        localStorage.getItem('swiftly_users') || '[]',
    );
    const idx = allUsers.findIndex((u) => u.id === session.id);

    if (idx === -1) return alert('User tidak ditemukan.');

    const nameInput = document.getElementById('edit_name') as HTMLInputElement;
    const phoneInput = document.getElementById('edit_phone') as HTMLInputElement;
    const genderInput = document.getElementById('edit_gender',) as HTMLSelectElement;
    const TanggalInput = document.getElementById('edit_tanggalLahir') as HTMLInputElement

    const labelInput = document.getElementById('addr_label') as HTMLInputElement;
    const detailInput = document.getElementById('addr_detail',) as HTMLTextAreaElement;
    const cityInput = document.getElementById('addr_city') as HTMLInputElement;
    const provinsiInput = document.getElementById('addr_province') as HTMLInputElement;
    const DisrcitInput = document.getElementById('addr_district') as HTMLInputElement;
    const PosCodeInput = document.getElementById('addr_postalCode') as HTMLInputElement;
    const imgPreview = document.getElementById('profile_preview') as HTMLImageElement;


    if (!nameInput.value.trim()) {
        NotificationsToast('error', 'Isi Nama', 'top-start', 2500);
        return;
    } else if (!phoneInput.value.trim() || phoneInput.value.length < 9) {
        NotificationsToast('error', 'Isi Nomor HP Dengan Valid', 'top-start', 2500);
        return;
    } else if (!genderInput.value.trim()) {
        NotificationsToast('error', 'Pilih Gender', 'top-start', 2500);
        return;
    } else if (!TanggalInput.value.trim()) {
        NotificationsToast('error', 'Isi Tanggal Lahir', 'top-start', 2500);
        return;
    } else if (!labelInput.value.trim()) {
        NotificationsToast('error', 'Isi Label Alamat', 'top-start', 2500);
        return;
    } else if (!detailInput.value.trim() || detailInput.value.trim().length < 50) {
        NotificationsToast('error', 'Isi Detail Alamat (Minimal 50 Karakter)', 'top-start', 2500);
        return;
    } else if (!cityInput.value.trim()) {
        NotificationsToast('error', 'Isi Kota', 'top-start', 2500);
        return;
    } else if (!provinsiInput.value.trim()) {
        NotificationsToast('error', 'Isi Provinsi', 'top-start', 2500);
        return;
    } else if (!DisrcitInput.value.trim()) {
        NotificationsToast('error', 'Isi Kecamatan', 'top-start', 2500);
        return;
    } else if (!PosCodeInput.value.trim() || !/^\d{5}$/.test(PosCodeInput.value)) {
        NotificationsToast('error', 'Kode Pos harus 5 digit angka', 'top-start', 2500);
        return;
    } else {
        NotificationsToast('error', 'Error, Coba Ulang Lagi', 'top-start', 2500);
    }

    allUsers[idx].name = nameInput?.value;
    allUsers[idx].phone = phoneInput?.value;
    allUsers[idx].gender = genderInput?.value;
    allUsers[idx].birthDate = TanggalInput?.value;
    if (imgPreview) {
        allUsers[idx].image = imgPreview.src;
    }
    if (allUsers[idx].addresses && allUsers[idx].addresses.length > 0) {
        allUsers[idx].addresses[0].label = labelInput.value;
        allUsers[idx].addresses[0].detail = detailInput.value;
        allUsers[idx].addresses[0].city = cityInput.value;
        allUsers[idx].addresses[0].province = provinsiInput.value;
        allUsers[idx].addresses[0].district = DisrcitInput.value;
        allUsers[idx].addresses[0].postalCode = PosCodeInput.value;
    } else {
        allUsers[idx].addresses = [
            {
                id: crypto.randomUUID(),
                label: labelInput.value,
                detail: detailInput.value,
                city: cityInput.value,
                phone: '',
                province: provinsiInput.value,
                district: DisrcitInput.value,
                postalCode: PosCodeInput.value,
                isPrimary: true,
            },
        ];
    }

    // Update alamat
    if (allUsers[idx].addresses && allUsers[idx].addresses.length > 0) {
        allUsers[idx].addresses[0].label =
            labelInput?.value || allUsers[idx].addresses[0].label;
        allUsers[idx].addresses[0].detail =
            detailInput?.value || allUsers[idx].addresses[0].detail;
        allUsers[idx].addresses[0].city =
            cityInput?.value || allUsers[idx].addresses[0].city;
        allUsers[idx].addresses[0].province =
            provinsiInput?.value || allUsers[idx].addresses[0].province;
        allUsers[idx].addresses[0].district =
            DisrcitInput?.value || allUsers[idx].addresses[0].district;
        allUsers[idx].addresses[0].postalCode =
            PosCodeInput?.value || allUsers[idx].addresses[0].postalCode;
    }

    allUsers[idx].updatedAt = new Date().toISOString()
    localStorage.setItem('swiftly_users', JSON.stringify(allUsers));

    // Update sesi dengan data terbaru dari user yang baru di-update
    localStorage.setItem(
        'swiftly_session',
        JSON.stringify({
            ...session,
            name: allUsers[idx].name,
            image: allUsers[idx].image,
        }),
    );

    NotificationsToast('success', 'Menyimpan Perubahan', 'top-start', 2500);
    isEditing = false;
    renderProfile();
    setTimeout(() => {
        window.location.reload();
    }, 2500);
}

renderProfile();
