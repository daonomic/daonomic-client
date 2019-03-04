// @flow
export function cacheResult<T>(fn: () => T, timeout: number = 0): () => T {
  let lastCallTimestamp = 0;
  let lastResult;

  return (...args) => {
    if (Date.now() - lastCallTimestamp > timeout) {
      lastCallTimestamp = Date.now();
      lastResult = fn(...args);
    }

    return lastResult;
  };
}
