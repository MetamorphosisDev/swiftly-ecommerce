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
    name: string;
    username: string;
    email: string;
    passwordHash: string;

    image?: string;

    phone: string;
    birthDate: string;
    gender: string;

    addresses: UserAddress[];

    createdAt: string;

    updatedAt?: string;

}