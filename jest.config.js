const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

module.exports = createJestConfig({
  testEnvironment: "jest-environment-jsdom",
  roots: [
    "<rootDir>/src"
  ],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1"
  },
  globalSetup: "<rootDir>/src/test/setup.ts"
});
