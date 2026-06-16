import { API } from "../../services/apiCommerce";
import type { promoType } from "../../data/TypeData_Object/promo_TypeData";

async function fetchPromo(): Promise<void> {
    try {
        const response = await fetch(API.PROMO_API);
        if (!response.ok) { throw new Error("Error fetch API"); }

        const data: promoType[] = await response.json();

        renderPromo(data);

    } catch (error) {
        console.error("Error fetch promo:", error);
    }
}


function renderPromo(data: promoType[]): void {
    const container = document.getElementById('Card-Promo')
    if (!container) return

    data.forEach((element) => {
        const card = document.createElement("div")
        card.addEventListener("click", () => {
            window.location.href = `/page/promoDiskon_Page.html?id_promo_valid=${element.id_promo_valid}`
        })

        card.id = `Card_promo_${element.id_promo_valid}`
        card.innerHTML = `
            <div class="rounded-xl p-4 shadow-md text-white cursor-pointer transition-all hover:scale-101 ease-in flex-shrink-0" 
            style="background:linear-gradient(50deg, ${element.color}, ${element.color}CC)">
                <div class="flex flex-col gap-1">
                    <h2 class="font-bold text-xl">${element.title}</h2>
                    <p class="text-xs line-clamp-1">${element.description}</p>
                </div>

                <div class="text-xs opacity-60 py-1">Tekan Sekarang <span>›</span></div>
                <div class="text-right text-xs opacity-50">${element.validUntil}</div>
            </div>
        `
        container.appendChild(card);
        console.log(element)
    })

}


fetchPromo()
