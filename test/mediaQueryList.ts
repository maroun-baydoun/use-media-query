export const create = (mediaQuery: string, inheritsEvenTarget = true) => {
  const listeners: { [event: string]: Function[] } = {};

  return (matches: boolean) => ({
    matches,
    media: mediaQuery,
    addEventListener: undefined,
    removeEventListener: undefined,
    ...(inheritsEvenTarget && {
      addEventListener: jest.fn((event: string, listener: Function) =>
        event in listeners
          ? listeners[event].push(listener)
          : (listeners[event] = [listener])
      ),
      removeEventListener: jest.fn(),
    }),

    addListener: jest.fn((listener: Function) => {
      "change" in listeners
        ? listeners["change"].push(listener)
        : (listeners["change"] = [listener]);
    }),
    removeListener: jest.fn(),
    onchange: jest.fn(),
    dispatchEvent: jest.fn((event: string, arg: any) =>
      listeners[event].forEach((listener) => {
        listener(arg);
      })
    ),
  });
};
