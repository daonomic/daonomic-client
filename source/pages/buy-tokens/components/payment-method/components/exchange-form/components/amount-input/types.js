// @flow

export type AmountInputProps = {
  amount: number,
  onChange: (event: SyntheticInputEvent<HTMLSelectElement>) => void,
  cost: number,
  tokenSymbol: string,
};
