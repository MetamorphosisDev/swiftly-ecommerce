export function parameter70Character(param: string) {
    if (param.length >= 65) {
        const text = param.slice(0, 65);
        return text + "..."
    }

    return param;
}