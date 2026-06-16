interface UserAddress {
    id: string;
    label: string;
    phone: string;
    province: string;
    city: string;
    district: string;
    postalCode: string;
    detail: string;
    isPrimary: boolean;
}

export interface UserRecord {
    id: string;
    // akun
    name: string;
    username: string;
    email: string;
    passwordHash: string;
    // profil
    image?: string;
    phone?: string;
    birthDate?: string;
    gender?: string;
    // alamat
    addresses: UserAddress[];
    // metadata
    role?: "user" | "admin";
    isVerified?: boolean;
    createdAt: string;
    updatedAt?: string;
}