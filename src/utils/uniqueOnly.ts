export const uniqueOnly = <T extends {id: number}>(v: T[]): T[] => {
    const unique: Record<number, T> = {}

    v.forEach(value => {
        unique[value.id] = value;
    })

    return Object.entries(unique).map(u => u[1]);
}