// @flow

export type PaymentServicePaymentMethod = {|
  id: string,
  token: string,
  label: string,
  price: string,
  rate: string,
  raised: string,
  sold: string,
  bonus: string,
|};

type PaymentServiceFetchRateTypeSuccess = {|
  rate: number,
|};

type PaymentServiceFetchRateTypeError = {|
  error: string,
|};

export type PaymentServiceFetchRateType =
  | PaymentServiceFetchRateTypeSuccess
  | PaymentServiceFetchRateTypeError;

type PaymentServiceFetchPaymentMethodsResponseSuccess = {|
  currencies: PaymentServicePaymentMethod[],
|};

type PaymentServiceFetchPaymentMethodsResponseError = {|
  reason: string,
|};

export type PaymentServiceFetchPaymentMethodsResponse =
  | PaymentServiceFetchPaymentMethodsResponseSuccess
  | PaymentServiceFetchPaymentMethodsResponseError;

export interface IPaymentService {
  determineBonus: (data: {|
    saleId: string,
    amount: number,
  |}) => Promise<number>;
  fetchRate: (data: {|
    to: string,
    from: string,
    amount: number,
  |}) => Promise<PaymentServiceFetchRateType>;
  fetchPaymentMethods: () => Promise<PaymentServiceFetchPaymentMethodsResponse>;
}
