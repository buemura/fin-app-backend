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
      "@configs/(.*)": "<rootDir>/src/configs/$1",
      "@controllers/(.*)": "<rootDir>/src/controllers/$1",
      "@interfaces/(.*)": "<rootDir>/src/interfaces/$1",
      "@middlewares/(.*)": "<rootDir>/src/middlewares/$1",
      "@repositories/(.*)": "<rootDir>/src/repositories/$1",
      "@routes/(.*)": "<rootDir>/src/routes/$1",
      "@services/(.*)": "<rootDir>/src/services/$1",
      "@utils/(.*)": "<rootDir>/src/utils/$1",
      "@tests/(.*)": "<rootDir>/tests/$1",
    },
    moduleDirectories: ["node_modules", "src"],
  };
};
