// @flow

export type PaymentMethodId = string;

export type PaymentMethod = {
  id: PaymentMethodId,
  label: string,
  token: string,
  rate: number,
};

export type Payment = {|
  txHash: string,
  value: number,
  status: 'PENDING' | 'CONFIRMED' | 'EXECUTING' | 'COMPLETED' | 'ERROR',
  createDate: number,
|};
