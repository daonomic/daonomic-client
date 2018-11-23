export function getMarkerSelector(...args) {
  const createInnerFunction = (accumulator = []) => {
    function inner(...args) {
      if (args.length === 0) {
        const marker = accumulator.join('/');

        return `[data-marker="${marker}"]`;
      }

      return createInnerFunction(accumulator.concat(args));
    }

    return inner;
  };

  return createInnerFunction()(...args);
}
