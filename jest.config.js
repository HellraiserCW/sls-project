module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
  ],
  modulePaths: ['./src'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.spec.{ts,js}',
    '!src/**/*.test.{ts,js}',
    '!src/**/*.d.ts',
    '!src/**/types.ts',
  ],
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};
