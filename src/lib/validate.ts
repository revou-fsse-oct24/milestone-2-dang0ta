
const INVALID_CATEGORIES_CHECK: ((name: string) => boolean)[] = [
    (name: string) => !name,
    (name: string) => !isNaN(Number(name)),
    (name: string) => name.toLowerCase().includes("test"),
    (name: string) => name.toLowerCase().includes("asd")
]

export const isNameInvalid = (name: string) => INVALID_CATEGORIES_CHECK.some((check) => check(name));