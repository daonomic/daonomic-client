// @flow

import { compose } from 'ramda';
import { inject, observer } from 'mobx-react';
import { PaymentMethodSelectView } from './view';

import type { TokenPurchase } from '~/domains/business/token-purchase/store';
import type { TokenStore } from '~/domains/business/token/store';
import type { TokenExchangeCalculations } from '~/domains/business/token-exchange-calculations/store';
import type { PaymentMethodSelectProps } from './view';

const getPurchasingTokenSymbol = (tokenPurchase: TokenPurchase): string => {
  const method = tokenPurchase.selectPaymentMethod;

  return method && method.id;
};

const enhance = compose(
  inject(
    ({
      tokenPurchase,
      tokenExchangeCalculations,
      token,
    }: {|
      tokenPurchase: TokenPurchase,
      tokenExchangeCalculations: TokenExchangeCalculations,
      token: TokenStore,
    |}): PaymentMethodSelectProps => ({
      handleExchangeState: tokenExchangeCalculations.handleState,
      onSelect: tokenPurchase.selectPaymentMethod,
      paymentMethods: token.sale && token.sale.paymentMethods,
      selectedPaymentMethod: tokenPurchase.selectedPaymentMethod,
      purchasingTokenSymbol: getPurchasingTokenSymbol(tokenPurchase),
    }),
  ),
  observer,
);

export const PaymentMethodSelect = enhance(PaymentMethodSelectView);
