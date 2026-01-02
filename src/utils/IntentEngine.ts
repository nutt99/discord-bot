export enum Intent {
    GREETING = "GREETING",
    UNKNOWN = "UNKNOWN",
}

export function detectIntent(text: string): Intent {
    const t = text.toLowerCase();

    if (
        t.includes("halo") ||
        t.includes("hai") ||
        t.includes("hello")
    ) {
        return Intent.GREETING;
    }

    return Intent.UNKNOWN;
}
