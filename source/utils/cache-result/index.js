// @flow
export default function cacheResult(
  fn: () => mixed,
  timeout: number = 0,
): Function {
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
