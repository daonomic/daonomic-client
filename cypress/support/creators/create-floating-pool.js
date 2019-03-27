export function createFloatingPool({ name, amount, ...rest }) {
  return {
    name,
    amount,
    startType: 'FLOATING',
    ...rest,
  };
}
