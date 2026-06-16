export type PromoStatus =
    | "active"
    | "expired"
    | "coming_soon";

export interface promoType {
    id_promo_valid: number;
    title: string;
    subtitle: string;
    description: string;
    discount: string;
    discount_Value: number;
    promoCode: string;
    startDate: string;
    validUntil: string;
    category: string;
    claimed: number;
    quota: number;
    rating: number;
    benefits: string[];
    terms: string[];
    status: PromoStatus;
    color: string;
}