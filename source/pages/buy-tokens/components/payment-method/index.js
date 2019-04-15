// @flow

import { compose } from 'ramda';
import { inject, observer } from 'mobx-react';
import { withMarkerTreeProvider } from '~/providers/marker-tree';
import { PaymentMethodView } from './view';

import type { TokenPurchase } from '~/domains/business/token-purchase';

const getShouldDisplayAddress = (tokenPurchase: TokenPurchase) => {
  const method = tokenPurchase.selectedPaymentMethod;

  if (!method) return false;

  return method.category === 'ETH' || method.category === 'SIDECHAIN';
};

export const PaymentMethod = compose(
  withMarkerTreeProvider('payment-method'),
  inject(({ tokenPurchase }: {| tokenPurchase: TokenPurchase |}) => ({
    shouldDisplayAddress: getShouldDisplayAddress(tokenPurchase),
    shouldDisplayExchangeForm: !!tokenPurchase.selectedPaymentMethod,
  })),
  observer,
)(PaymentMethodView);
