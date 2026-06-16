// Hash PW
export function hash(str: string): string {
    let h = 5381;
    for (let i = 0; i < str.length; i++) {
        h = (h * 33) ^ str.charCodeAt(i);
    }
    return (h >>> 0).toString(16);
}