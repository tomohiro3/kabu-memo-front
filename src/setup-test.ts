// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// establish API mocking on the global level.
// import { server } from './__mocks__/server.ts';

// jest用のaxiosにXMLHttpRequestをunset
// global.XMLHttpRequest = undefined;

// Establish API mocking before all tests.
// beforeAll(() => {
//   server.listen();
// });
// beforeEach(() => {
//   window.alert = jest.fn();
//   window.confirm = jest.fn().mockImplementation(() => true);
// });
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
// afterEach(() => {
// TODO
// mockClear()がtypeエラーになるの解消
//   window.alert.mockClear();
//   window.confirm.mockClear();
//   server.resetHandlers();
// });
// Clean up after the tests are finished.
// afterAll(() => server.close());
