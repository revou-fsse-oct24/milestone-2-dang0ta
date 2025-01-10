// this utility is unnecessary, I add it just to learn generics :)

type Constructable<P,T> = new (param: P) => T;

/**
 * A utility function that attempts to construct instances of a given class from an array of raw JSON objects.
 * If the construction of an instance fails, it skips the erroneous object and logs a warning.
 *
 * @template R - The type of the raw JSON objects.
 * @template P - The type of the constructed instances.
 * @param {R[]} rawData - An array of raw JSON objects to be parsed.
 * @param {Constructable<R, P>} ctor - A constructor function that takes a raw JSON object and returns an instance of type P.
 * @returns {P[]} An array of successfully constructed instances of type P.
 */
export const skipErroneous = <R, P>(rawData: R[], ctor: Constructable<R, P> ): P[] => {
    const parsed: P[] = [];

    rawData.forEach((raw)=> {
        try {
            parsed.push(new ctor(raw));
        } catch(e) {
            console.warn("Failed to parse", e, raw);
        }
    })

    return parsed;
}