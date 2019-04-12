// @flow

import type { PaymentMethodContextValue } from './types';

export const initialValue: PaymentMethodContextValue = {
  selectedPaymentMethod: null,
  selectedSymbol: null,
  purchasingTokenSymbol: null,
  getPublicPrice: () => {},
  selectedMethodAddress: null,
  displayAddress: false,
};
