module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["/node_modules/", "/test/"],
  modulePaths: ["./src/controllers"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  collectCoverageFrom: [
    "src/**/*.{ts,js}",
    "!src/**/*.spec.{ts,js}",
    "!src/**/*.test.{ts,js}",
    "!src/**/*.d.ts",
    "!src/**/types.ts",
  ],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
