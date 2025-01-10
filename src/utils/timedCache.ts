
const FIVE_MINUTES = 5 * 60 * 1000;

/**
 * get cache key that will returns the exact same value for every {roundingValue} time-block,
 * effectively creating a cache key that expires every {roundingValue} milliseconds.
 * @param roundingValue 
 * @returns 
 */
export function getCacheKey(roundingValue: number = FIVE_MINUTES) {
    const now = new Date().getTime();

    // Calculate the start of the 5-minute block in milliseconds
    const blockStart = Math.floor(now / roundingValue) * roundingValue; 
  
    return `cache_${blockStart}`;
}

export class TimedCache<T> {
    private readonly timeout: number;
    private readonly prefix: string;

    constructor(prefix: string = "cache",timeout: number = FIVE_MINUTES) {
        this.timeout = timeout;
        this.prefix = prefix;
    }

    set(value: T) {
        const current: Record<string, T> = JSON.parse(localStorage.getItem(this.prefix) || "{}");
        current[getCacheKey(this.timeout)] =value;

        localStorage.setItem(this.prefix, JSON.stringify(current));
    }

    get(): T | undefined {
        const currentKey = getCacheKey(this.timeout);
        let current: Record<string, T> = JSON.parse(localStorage.getItem(this.prefix) || "{}");

        const value = current[currentKey];
        if (value) {
            current = this.evictExpired(currentKey, current);
            localStorage.setItem(this.prefix, JSON.stringify(current));
        }
        return value;
    }

    private evictExpired(current: string, items: Record<string, T>): Record<string, T> {
        for (const key in items) {
            if (key !== current) {
                delete(items[key]);
            }
        }

        return items;
    }
}
