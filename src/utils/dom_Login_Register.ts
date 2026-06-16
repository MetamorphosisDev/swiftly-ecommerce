// Shortcut getElementById
export function el<T extends HTMLElement>(id: string) {
    return document.getElementById(id) as T;
}