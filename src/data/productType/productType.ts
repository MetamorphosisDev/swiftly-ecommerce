interface ProductTypeCategory {
    name: string;
    img: string;
    apiKey: string;
}
export const productCategorylist: ProductTypeCategory[] = [
    { name: "Semua Produk", img: "icon/categoryProduct/Icon_SemuaProduk.svg", apiKey: "all" },
    { name: "Elektronik", img: "icon/categoryProduct/Icon_teknologi.svg", apiKey: "electronics" },
    { name: "Perhiasan", img: "icon/categoryProduct/Icon_Perhiasan.svg", apiKey: "jewelery" },
    { name: "Pakaian Pria", img: "icon/categoryProduct/Icon_bajuPria.svg", apiKey: "men's clothing" },
    { name: "Pakaian Wanita", img: "icon/categoryProduct/Icon_bajuWanita.svg", apiKey: "women's clothing" },
];
