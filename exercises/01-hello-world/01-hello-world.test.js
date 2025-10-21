const { sayHello } = require('./exercise');

describe('Hello World Exercise', () => {
  let logSpy;

  beforeEach(() => {
    jest.resetModules();
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  test('sayHello should console.log "Hello, World!"', () => {
    expect(typeof sayHello).toBe('function');
    sayHello();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('Hello, World!');
  });
});
