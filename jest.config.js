// TODO
// jsxのテストがパースエラーでこけるの解消
module.exports = {
  verbose: true,
  roots: ['<rootDir>/src'],
  testMatch: ['<rootDir>/src/__tests__/**/*.+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  // preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setup-test.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/public/'],
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // moduleNameMapper: {
  //   // Need to map.
  //   '\\.scss$': 'identity-obj-proxy',
  //   '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
  // },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  // https://github.com/zeit/next.js/issues/8663#issue-490553899
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires. you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    'ts-jest': {
      babelConfig: '<rootDir>/src/__tests__/babelrc.test.json',
      tsconfig: '<rootDir>/src/__tests__/tsconfig.jest.json',
    },
  },
};
