export function getCurrentUser() {
    const data = localStorage.getItem('swiftly_session') || sessionStorage.getItem('swiftly_session');
    return data ? JSON.parse(data) : null;
}

import type { UserRecord } from "../data/TypeData_Object/AccountSwiftly_Type";
export function getAccountUser(): UserRecord[] {
    const raw =
        localStorage.getItem("swiftly_users") ||
        sessionStorage.getItem("swiftly_users");

    if (!raw) return [];

    try {
        return JSON.parse(raw) as UserRecord[];
    } catch (err) {
        console.error("Invalid user data in storage");
        return [];
    }
}