// @ts-ignore
global._env_ = {
  API_SERVER_URL: 'http://localhost:8000',
  API_GRAPHQL_SERVER_URL: 'http://localhost:8000',
  API_CSRFTOKEN_URL: 'http://localhost:8000',
};

// See https://github.com/ant-design/ant-design/issues/21096
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
