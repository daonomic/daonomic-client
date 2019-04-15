// @flow

import { SaleStore } from '~/domains/business/sale/store';
import type { PaymentServicePaymentMethod } from '~/domains/business/payment/types';

export interface ITokenExchangeCalculationsService {
  calculateCostAndAmount: ({
    paymentMethod: PaymentServicePaymentMethod,
    sale: SaleStore,
    prevCost: number,
    prevAmount: number,
  }) => Promise<
    | {|
        cost: number,
        amount: number,
      |}
    | boolean,
  >;
}

// import type { TokenExchangeState } from '~/domains/business/token-exchange-calculations/store/types';
