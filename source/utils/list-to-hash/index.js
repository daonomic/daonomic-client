const identity = (x) => x;

export default function listToHash(key, getValue = identity) {
  return (array = []) => array.reduce((result, item) => {
    result[item[key]] = getValue(item); // eslint-disable-line no-param-reassign
    return result;
  }, {});
}
