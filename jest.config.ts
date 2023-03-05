import type { Config } from "jest";

export default async (): Promise<Config> => {
  return {
    roots: ["<rootDir>/src"],
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
    moduleNameMapper: {
      "@application/(.*)": "<rootDir>/src/application/$1",
      "@helpers/(.*)": "<rootDir>/src/helpers/$1",
      "@infra/(.*)": "<rootDir>/src/infra/$1",
      "@shared/(.*)": "<rootDir>/src/shared/$1",
      "@tests/(.*)": "<rootDir>/tests/$1",
    },
    moduleDirectories: ["node_modules", "src"],
  };
};
