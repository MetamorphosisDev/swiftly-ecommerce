import type { RiwayatType } from "../data/TypeData_Object/riwayatPemesanan_Type";

export function addToRiwayat(data: RiwayatType): void {
    const riwayat: RiwayatType[] = JSON.parse(
        localStorage.getItem("swiftly_riwayat") || "[]"
    );
    riwayat.push(data);
    localStorage.setItem("swiftly_riwayat", JSON.stringify(riwayat)
    );
    console.log("RIWAYAT:", riwayat);
}

export function createRiwayatFromItem(item: any): RiwayatType {
    return {
        id: Date.now(),
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: item.quantity ?? 1,
        totalPrice: item.price * (item.quantity ?? 1),
        purchaseDate: new Date().toISOString(),
        status: "Diproses"
    };
}
