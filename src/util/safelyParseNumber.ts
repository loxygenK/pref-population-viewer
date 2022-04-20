const NUMERIC_REGEX = /-?\d+/;
export const safelyParseNumber = (original: unknown): number => {
  if (typeof original === "number") {
    return original;
  }

  if (typeof original !== "string") {
    // FIXME: This is temporal, wrap the value by the Result monad thing
    return NaN;
  }

  if (!NUMERIC_REGEX.test(original)) {
    return NaN;
  }

  return parseFloat(original);
};
