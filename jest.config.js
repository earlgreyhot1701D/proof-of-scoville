// jest.config.js

module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'jsdom',

  // Match tests in __tests__ folders or with .test/.spec naming
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

  // Map custom module aliases (adjust '@/' to match your setup)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Ensure coverage is collected
  collectCoverage: true,
  coverageDirectory: 'coverage',

  // Enforce minimum coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Ignore transforms from known compatible node_modules
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|expo(nent)?|@expo(nent)?/.*)',
  ],

  // Automatically clear mocks before each test
  clearMocks: true,

  // Use verbose test output
  verbose: true,
};
