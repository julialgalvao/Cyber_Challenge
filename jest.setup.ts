import '@testing-library/jest-dom';


try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require.resolve('react-native-reanimated');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
} catch {
  // pacote não instalado → ignore
}
