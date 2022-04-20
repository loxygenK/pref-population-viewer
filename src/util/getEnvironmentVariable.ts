export const getEnvironmentVariable = (name: string): string => {
  const value = process.env[name];

  if (value === undefined) {
    throw new Error(`The environment variable ${name} should be set`);
  }
  return value;
};
