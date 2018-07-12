export function getMarker(...args) {
  const createInnerFunction = (accumulator = []) => {
    function inner(...args) {
      if (args.length === 0) {
        return accumulator.join('/');
      }

      return createInnerFunction(accumulator.concat(args));
    }

    return inner;
  };

  return createInnerFunction()(...args);
}
