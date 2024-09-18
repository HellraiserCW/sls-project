module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["/node_modules/", "/test/"],
  modulePaths: ["./src"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  collectCoverageFrom: [
    "src/controllers/**/*.{ts,js}",
    "src/middlewares/**/*.{ts,js}",
  ],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
