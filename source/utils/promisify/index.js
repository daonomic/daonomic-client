export const promisify = (fn) => (...params) =>
  new Promise((resolve, reject) => {
    fn(...params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
