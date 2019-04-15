// @flow

import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { PaymentMethodAddressView } from './view';
import { TokenPurchase } from '~/domains/business/token-purchase/store';
import { compose } from 'ramda';

const getPaymentMethodSymbol = (tokenPurchase: TokenPurchase): ?string => {
  const method = tokenPurchase.selectedPaymentMethod;

  if (!method) return null;

  return method.id;
};

const getPaymentMethodAddress = (tokenPurchase: TokenPurchase): ?string => {
  const method = tokenPurchase.selectedPaymentMethod;

  if (!method) return null;

  return method.token;
};

const enhance = compose(
  inject(({ tokenPurchase }: {| tokenPurchase: TokenPurchase |}) => ({
    paymentMethodSymbol: getPaymentMethodSymbol(tokenPurchase),
    paymentMethodAddress: getPaymentMethodAddress(tokenPurchase),
  })),
  observer,
);

export const PaymentMethodAddress: React.ComponentType<mixed> = enhance(
  PaymentMethodAddressView,
);
