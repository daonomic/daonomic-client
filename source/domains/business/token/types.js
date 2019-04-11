// @flow
export type Data = {|
  id: string,
  address: string,
  name: string,
  symbol: string,
  features?: string[],
|};

export type ContractProxies = {
  [key: string]: string,
};
