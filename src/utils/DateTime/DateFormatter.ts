export function formatDateID(dateString?: string) {
    const date = new Date(dateString || "");
    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta"
    });
}