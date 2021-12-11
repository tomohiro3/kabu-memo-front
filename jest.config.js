module.exports = {
    roots: ['<rootDir>'],
    testMatch: ['<rootDir>/__tests__/**/*.+(ts|tsx|js)'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    // setupFilesAfterEnv: ['<rootDir>/test/setup-tests.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/public/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      // Need to map.
      '\\.scss$': 'identity-obj-proxy',
      '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js'
    },
    // https://github.com/zeit/next.js/issues/8663#issue-490553899
    globals: {
      // we must specify a custom tsconfig for tests because we need the typescript transform
      // to transform jsx into js rather than leaving it jsx such as the next build requires. you
      // can see this setting in tsconfig.jest.json -> "jsx": "react"
      'ts-jest': {
        tsConfig: '<rootDir>/test/tsconfig.jest.json'
      }
    }
  };