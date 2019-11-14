module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  roots: ['<rootDir>/src/'],
  setupFiles: ['<rootDir>/src/__tests__/jestSetup.ts'],
  testRegex: '(/__tests__/.*\\.(test|tests|spec))\\.(ts|tsx|js)$',
  // TODO: Not sure that this is needed below
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/node_modules/'],
};
