import type { Config } from "jest";

export default async (): Promise<Config> => {
  return {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    setupFiles: ["<rootDir>/tests/jest-setup.ts"],
    testMatch: ["**/**/*.(spec|test).ts"],
    detectOpenHandles: true,
    collectCoverage: false,
    coveragePathIgnorePatterns: ["node_modules", "<rootDir>/src/repositories"],
    transform: { "^.+\\.tsx?$": "ts-jest" },
    forceExit: true,
  };
};
