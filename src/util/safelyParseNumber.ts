const NUMERIC_REGEX = /-?\d+/;
export const safelyParseNumber = (original: unknown): number | undefined => {
  if (typeof original === "number") {
    return original;
  }

  if (typeof original !== "string") {
    return undefined;
  }

  if (!NUMERIC_REGEX.test(original)) {
    return undefined;
  }

  return parseFloat(original);
};
