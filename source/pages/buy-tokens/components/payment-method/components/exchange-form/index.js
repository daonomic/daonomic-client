// @flow

import { inject, observer } from 'mobx-react';
import { compose } from 'ramda';
import { ExchangeFormView } from './view';
import { withMarkerTreeProvider } from '~/providers/marker-tree';
import { TokenPurchase } from '~/domains/business/token-purchase/store';
import { createMakePurchase } from '~/domains/business/token-purchase/action-creators/create-make-purchase';

import type { TokenExchangeCalculations } from '~/domains/business/token-exchange-calculations/store';
import type { TokenStore } from '~/domains/business/token/store';

const enhance = compose(
  withMarkerTreeProvider('exchange-form'),
  inject(
    ({
      token,
      tokenExchangeCalculations,
      tokenPurchase,
    }: {|
      tokenExchangeCalculations: TokenExchangeCalculations,
      tokenPurchase: TokenPurchase,
      token: TokenStore,
    |}) => ({
      tokenSymbol: token.symbol,
      displayResetButton: tokenExchangeCalculations.state.cost !== 0,
      hasLastTransaction: !!tokenPurchase.lastTransaction,
      isKyber: tokenPurchase.isKyber,
      hasError: tokenExchangeCalculations.state.hasError,
      handleIsAgreeWithKyberTerms: tokenPurchase.handleIsAgreeWithKyberTerms,
      onSubmit: createMakePurchase({
        tokenExchangeCalculations,
        tokenPurchase,
      }),
    }),
  ),
  observer,
);

export const ExchangeForm = enhance(ExchangeFormView);
