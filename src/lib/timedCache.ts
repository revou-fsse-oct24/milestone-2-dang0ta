
const FIVE_MINUTES = 5 * 60 * 1000;

const getCacheKey = (roundingValue: number = FIVE_MINUTES) =>
  `cache_${Math.floor(new Date().getTime() / roundingValue) * roundingValue}`;


/**
 * A utility class that provides a simple timed cache mechanism using localStorage.
 * The cache stores values with a time-based key and evicts expired entries.
 * 
 * This cache uses no timer, the time-based eviction is achieved by constructing 
 * cache key in a way that the key is always going to be the exact same if generated 
 * within the same time block, with the default time block being 5 minutes.
 *
 * @template T - The type of the value to be stored in the cache.
 */
export class TimedCache<T> {
  private readonly timeout: number;
  private readonly prefix: string;

  constructor(prefix: string = "cache", timeout: number = FIVE_MINUTES) {
    this.timeout = timeout;
    this.prefix = prefix;
  }

  set(value: T) {
    const current: Record<string, T> = JSON.parse(
      localStorage.getItem(this.prefix) || "{}"
    );
    current[getCacheKey(this.timeout)] = value;
    localStorage.setItem(this.prefix, JSON.stringify(current));
  }

  get(): T | undefined {
    const currentKey = getCacheKey(this.timeout);
    const current: Record<string, T> = JSON.parse(
      localStorage.getItem(this.prefix) || "{}"
    );

    const value = current[currentKey];
    if (!value) {
        localStorage.removeItem(this.prefix);
        return undefined;
    }

    return value;
  }
}

