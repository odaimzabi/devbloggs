import { compilerOptions } from "./tsconfig.json";
import type { Config } from "@jest/types";

/**
 * Make `tsconfig.json`'s `paths` work in Jest
 * @link https://stackoverflow.com/a/56792936
 */

const config: Config.InitialOptions = {
  verbose: true,
  roots: ["<rootDir>"],
  testMatch: [
    "<rootDir>/tests/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  testPathIgnorePatterns: ["<rootDir>/.next", "<rootDir>/playwright/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      require.resolve("./mocks/fileMock.js"),
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  testEnvironment: "jsdom",
};

export default config;
