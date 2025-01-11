export const skipErroneousFunctional = <T>(
  rawData: T[],
  validator: (raw: T) => void
): T[] => {
  const parsed: T[] = [];

  rawData.forEach((raw) => {
    try {
      validator(raw);
      parsed.push(raw);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // console.warn("Failed to parse", e, raw);
    }
  });

  return parsed;
};
