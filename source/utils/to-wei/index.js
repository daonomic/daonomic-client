// @flow

export const toWei = ({
  cost,
  decimals,
}: {|
  cost: number,
  decimals: number,
|}): number => {
  const result = cost * Math.pow(10, decimals);

  if (result >= Number.MAX_SAFE_INTEGER) {
    return Math.round(cost * Math.pow(10, decimals));
  }

  return result;
};
