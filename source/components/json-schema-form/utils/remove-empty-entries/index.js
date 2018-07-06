import isPlainObject from 'is-plain-obj';

export function removeEmptyEntries(formData) {
  return Object.entries(formData).reduce((result, [key, value]) => {
    if (isPlainObject(value)) {
      result[key] = removeEmptyEntries(value);
    } else if (value !== '') {
      result[key] = value;
    }

    return result;
  }, {});
}
