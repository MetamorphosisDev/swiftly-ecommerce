// Convert Price
export function currencyConvert(price: number, kurs: number = 17632.55): string {
    const convert = Math.round(kurs * price)
    const result = convert.toLocaleString("id-ID");
    return result
}