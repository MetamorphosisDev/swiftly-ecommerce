// Ambil daftar user dari localStorage
import type { UserRecord } from "../data/TypeData_Object/AccountSwiftly_Type";
export function getUsers(): UserRecord[] {
    return JSON.parse(localStorage.getItem('swiftly_users') ?? '[]');
}