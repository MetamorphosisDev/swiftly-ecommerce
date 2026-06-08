interface ProductTypeCategory {
    name: string;
    img: string;
    apiKey: string;
    colorCircle: string;
}
export const productCategorylist: ProductTypeCategory[] = [
    { name: "Semua Produk", img: "icon/categoryProduct/Icon_SemuaProduk.svg", apiKey: "all", colorCircle: "#e4f0fe" },
    { name: "Elektronik", img: "icon/categoryProduct/Icon_teknologi.svg", apiKey: "electronics", colorCircle: "#eacefc" },
    { name: "Perhiasan", img: "icon/categoryProduct/Icon_Perhiasan.svg", apiKey: "jewelery", colorCircle: "#fee4c5" },
    { name: "Pakaian Pria", img: "icon/categoryProduct/Icon_bajuPria.svg", apiKey: "men's clothing", colorCircle: "#cdf1f2" },
    { name: "Pakaian Wanita", img: "icon/categoryProduct/Icon_bajuWanita.svg", apiKey: "women's clothing", colorCircle: "#fbd6e9" },
];
