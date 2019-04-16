// @flow

export type PaymentServicePaymentMethod = {|
  id: string, // symbol
  label: string, // full label
  token: string, // address
  default: boolean,
  price: number,
  rate: number,
  raised: number,
  sold: number,
  conversionRate: number,
  category: 'ETH' | 'SIDECHAIN' | 'ERC20' | 'KYBER_NETWORK',
  kyberNetwork: boolean,
  decimals: number,
  bonus?: string,
|};

type PaymentServiceFetchRateTypeSuccess = {|
  rate: number,
  price: number,
  conversionRate: number,
|};

type PaymentServiceFetchRateTypeError = {|
  reason: string,
|};

export type PaymentServiceFetchRateType =
  | PaymentServiceFetchRateTypeSuccess
  | PaymentServiceFetchRateTypeError;

export type PaymentServiceFetchRateData = {|
  address: string,
  amount: number,
|};
export interface IPaymentService {
  determineBonus: (data: {|
    saleId: string,
    amount: number,
  |}) => Promise<number>;
  fetchRate: (
    data: {|
      address: string,
      amount: number,
    |},
    saleId: string,
  ) => Promise<PaymentServiceFetchRateType>;
}
