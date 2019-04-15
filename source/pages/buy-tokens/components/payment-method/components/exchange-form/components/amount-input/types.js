// @flow

export type AmountInputProps = {
  isHydrating: boolean,
  amount: number,
  onChange: (event: SyntheticInputEvent<HTMLSelectElement>) => void,
  cost: number,
  tokenSymbol: string,
};
