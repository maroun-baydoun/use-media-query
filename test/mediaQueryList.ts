export const create = (mediaQuery: string) => {
  const listeners: {[event: string]: Function[]} = {};
  return (matches: boolean) => ({
    matches,
    media: mediaQuery,
    addEventListener: jest.fn((event: string, listener) =>
      event in listeners
        ? listeners[event].push(listener)
        : (listeners[event] = [listener])
    ),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    onchange: jest.fn(),
    dispatchEvent: jest.fn((event: string, arg: any) =>
      listeners[event].forEach((listener) => {
        listener(arg);
      })
    ),
  });
};
