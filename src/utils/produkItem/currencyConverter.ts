// Convert Price
export function currencyConvert(price: number, kurs: number = 18000): number {
    return Math.round(kurs * price)
}