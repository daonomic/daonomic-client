// @flow
export default {
  getItem(key: string): ?string {
    let result = null;

    try {
      result = window.localStorage.getItem(key);
    } catch (error) {} // eslint-disable-line no-empty

    return result;
  },

  setItem(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {} // eslint-disable-line no-empty
  },

  removeItem(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {} // eslint-disable-line no-empty
  },

  clear(): void {
    try {
      window.localStorage.clear();
    } catch (error) {} // eslint-disable-line no-empty
  },

  get length(): number {
    let result = 0;

    try {
      result = window.localStorage.length;
    } catch (error) {} // eslint-disable-line no-empty

    return result;
  },
};
