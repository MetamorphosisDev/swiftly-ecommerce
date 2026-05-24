export function getword(sentence: string) {
    return sentence.split(" ").slice(0, 3).join(" ");
}