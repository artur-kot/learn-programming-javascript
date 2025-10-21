const { displayMessages } = require('./exercise');

describe('Multiple Messages Exercise', () => {
  let logSpy;

  beforeEach(() => {
    jest.resetModules();
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  test('displayMessages should be a function', () => {
    expect(typeof displayMessages).toBe('function');
  });

  test('displayMessages should call console.log at least three times', () => {
    displayMessages();
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy.mock.calls.length).toBeGreaterThanOrEqual(3);
  });

  test('displayMessages should print "Long and" first', () => {
    displayMessages();
    expect(logSpy).toHaveBeenNthCalledWith(1, 'Long and');
  });

  test('displayMessages should print "exciting journey" second', () => {
    displayMessages();
    expect(logSpy).toHaveBeenNthCalledWith(2, 'exciting journey');
  });

  test('displayMessages should print "before you." third', () => {
    displayMessages();
    expect(logSpy).toHaveBeenNthCalledWith(3, 'before you.');
  });

  test('displayMessages should print all three messages in the correct order', () => {
    displayMessages();
    expect(logSpy).toHaveBeenNthCalledWith(1, 'Long and');
    expect(logSpy).toHaveBeenNthCalledWith(2, 'exciting journey');
    expect(logSpy).toHaveBeenNthCalledWith(3, 'before you.');
  });

  test.todo('Bonus: displayMessages should also print "JavaScript is not Java" using string concatenation');
});
