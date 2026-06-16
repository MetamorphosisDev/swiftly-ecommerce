const input = document.getElementById("searchInput") as HTMLInputElement;

const data = [
    { title: "Produk Populer" },
    { title: "Mens Cotton Jacket" },
    { title: "Tren Hari Ini" },
    { title: "Opna Women's Short" },
    { title: "WD 4TB Gaming" },
    { title: "BIYLACLESEN Women" },
    { title: "Perhiasan Mewah" },
];

let i = 0;

function rotatePlaceholder() {
    if (!input) return;

    // fade out
    input.style.opacity = "0";
    setTimeout(() => {
        input.placeholder = `${data[i].title}`;
        i = (i + 1) % data.length;

        // fade in
        input.style.opacity = "1";
    }, 200);
}

setInterval(rotatePlaceholder, 8000);