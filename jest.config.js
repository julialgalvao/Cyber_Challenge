/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },

  transformIgnorePatterns: [
  'node_modules/(?!(react-native|@react-native|@react-navigation|expo|@expo|react-native-gesture-handler)/)',
],


  setupFiles: [],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['**/_tests_/**/*.test.ts?(x)', '**/_tests_/**/*.teste.ts?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
