export default function omit(keys) {
  return (object) => Object.keys(object).reduce((result, key) => {
    if (!keys.includes(key)) {
      result[key] = object[key]; // eslint-disable-line no-param-reassign
    }

    return result;
  }, {});
}
