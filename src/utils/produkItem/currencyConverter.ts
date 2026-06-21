// Convert Price
export function currencyConvert(price: number, kurs: number = 17796): number {
    return Math.round(kurs * price)
}