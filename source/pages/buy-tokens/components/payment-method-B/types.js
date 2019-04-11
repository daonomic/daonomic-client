// @flow

import type { PaymentServicePaymentMethod } from '~/domains/business/payment/types';

export type PaymentMethodContextValue = {|
  purchasingTokenSymbol: ?string,
  selectedPaymentMethod: ?PaymentServicePaymentMethod,
  selectPaymentMethod?: (key: ?PaymentServicePaymentMethod) => void,
  selectedSymbol: ?string,
  selectedMethodAddress: ?string,
  getPublicPrice: (symbol: string) => ?number,
|};
