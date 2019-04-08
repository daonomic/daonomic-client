// @flow

export type KyberNetworkCurrency = {|
  name: string,
  decimals: number,
  address: string,
  symbol: string,
  id: string,
|};

export type KyberNetworkGetAvailableCurrenciesResponse = {|
  error: boolean,
  data: KyberNetworkCurrency[],
|};

export type KyberNetworkRate = {|
  src_id: string,
  dst_id: string,
  src_qty: number[],
  dst_qty: number[],
|};

export type KyberNetworkGetSaleRateResponse = {|
  error: boolean,
  data: KyberNetworkRate[],
|};

export type KyberNetworkGetBuyRateResponse = {|
  error: boolean,
  data: KyberNetworkRate[],
|};

export interface IKyberNetworkService {
  getSellRate: ({
    id: string,
    qty: number,
  }) => Promise<KyberNetworkGetBuyRateResponse>;
  getBuyRate: ({
    id: string,
    qty: number,
  }) => Promise<KyberNetworkGetBuyRateResponse>;
  getAvailableCurrencies: () => Promise<KyberNetworkGetAvailableCurrenciesResponse>;
}
