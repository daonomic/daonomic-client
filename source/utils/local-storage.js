export default {
  getItem(key) {
    let result = null;

    try {
      result = window.localStorage.getItem(key);
    } catch (error) {} // eslint-disable-line no-empty

    return result;
  },

  setItem(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {} // eslint-disable-line no-empty
  },

  removeItem(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {} // eslint-disable-line no-empty
  },

  clear() {
    try {
      window.localStorage.clear();
    } catch (error) {} // eslint-disable-line no-empty
  },

  get length() {
    let result = 0;

    try {
      result = window.localStorage.length;
    } catch (error) {} // eslint-disable-line no-empty

    return result;
  },
};
