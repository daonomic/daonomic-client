// @flow

import type { PaymentServicePaymentMethod } from '~/domains/business/payment/types';

export type PaymentMethodContextValue = {|
  purchasingTokenSymbol: ?string,
  selectedPaymentMethod: ?PaymentServicePaymentMethod,
  selectPaymentMethod?: (key: ?PaymentServicePaymentMethod) => void,
  selectedSymbol: ?string,
  displayAddress: boolean,
  selectedMethodAddress: ?string,
  getPublicPrice: (symbol: string) => ?number,
|};

export type PaymentMethodProps = {|
  displayAddress: boolean,
|};
