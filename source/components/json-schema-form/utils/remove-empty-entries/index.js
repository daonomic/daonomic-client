import isObject from 'is-object';

export function removeEmptyEntries(formData) {
  return Object.entries(formData).reduce((result, [key, value]) => {
    if (isObject(value)) {
      result[key] = removeEmptyEntries(value);
    } else if (value !== '') {
      result[key] = value;
    }

    return result;
  }, {});
}
