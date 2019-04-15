// @flow

import { inject, observer } from 'mobx-react';
import { compose } from 'ramda';
import { ExchangeFormView } from './view';
import { TokenPurchase } from '~/domains/business/token-purchase/store';
import { createMakePurchase } from '~/domains/business/token-purchase/action-creators/create-make-purchase';

import type { TokenExchangeCalculations } from '~/domains/business/token-exchange-calculations/store';
import type { TokenStore } from '~/domains/business/token/store';

const enhance = compose(
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
  // withToken((tokenStore) => ({
  //   tokenSymbol: tokenStore.symbol,
  // })),
  // onSubmit: context.handleSubmit,
  // displayResetButton: context.cost !== 0,
  // hasFetchError: context.hasFetchError,
  // isKyber: context.isKyber,
  // hasLastTransaction: !!context.lastTransaction,
  // handleKyberTermsCheckedState: context.handleKyberTermsCheckedState,
);

export const ExchangeForm = enhance(ExchangeFormView);
