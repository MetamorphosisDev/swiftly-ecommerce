export function idElementPageDetail(divelement: HTMLElement, id: number) {
    divelement.addEventListener("click", () => {
        window.location.href = `/page/productPageDetail.html?id=${id}`
    })
}