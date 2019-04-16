// @flow

import * as React from 'react';
import { compose } from 'ramda';
import { observer, inject } from 'mobx-react';
import { SubmitButtonView } from './view';
import { createMakePurchase } from '~/domains/business/token-purchase/action-creators/create-make-purchase';

import type { TokenPurchase } from '~/domains/business/token-purchase/store';
import type { TokenExchangeCalculations } from '~/domains/business/token-exchange-calculations/store';

const getIsMaySubmit = ({
  tokenExchangeCalculations,
  tokenPurchase,
}: {|
  tokenExchangeCalculations: TokenExchangeCalculations,
  tokenPurchase: TokenPurchase,
|}) => {
  const { cost, isHydrating, hasError } = tokenExchangeCalculations.state;

  const maySubmitBase = cost !== 0 && !isHydrating && !hasError;

  if (tokenPurchase.isKyber) {
    return tokenPurchase.isAgreeWithKyberTerms && maySubmitBase;
  }

  return maySubmitBase;
};

const enhance = compose(
  inject(
    ({
      tokenPurchase,
      tokenExchangeCalculations,
    }: {|
      tokenPurchase: TokenPurchase,
      tokenExchangeCalculations: TokenExchangeCalculations,
    |}) => ({
      isKyber: tokenPurchase.isKyber,
      disabled: !getIsMaySubmit({
        tokenExchangeCalculations,
        tokenPurchase,
      }),
      onClick: createMakePurchase({
        tokenExchangeCalculations,
        tokenPurchase,
      }),
    }),
  ),
  observer,
);

export const SubmitButton: React.ComponentType<{}> = enhance(SubmitButtonView);
