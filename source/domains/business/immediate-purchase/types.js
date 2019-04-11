// @flow

import type { PaymentServicePaymentMethod } from '~/domains/business/payment/types';

export interface IImmediatePurchaseService {
  buyTokens: ({
    cost: number,
    paymentMethod: PaymentServicePaymentMethod,
    saleAddress: string,
  }) => Promise<void>;
  buyInErc20: ({|
    costInWei: number,
    saleAddress: string,
  |}) => Promise<void>;
}
