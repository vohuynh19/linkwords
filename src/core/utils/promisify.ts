export const promisify = (fn: (cb: () => void) => void) =>
  new Promise<void>((resolve) => {
    fn(resolve);
  });
