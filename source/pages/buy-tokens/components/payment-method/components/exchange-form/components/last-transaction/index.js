// @flow

import { inject, observer } from 'mobx-react';
import { compose } from 'ramda';
import { LastTransactionView } from './view';

import type { TokenStore } from '~/domains/business/token/store';
import type { TokenPurchase } from '~/domains/business/token-purchase/store';

const enhance = compose(
  inject(
    ({
      tokenPurchase,
      token,
    }: {|
      tokenPurchase: TokenPurchase,
      token: TokenStore,
    |}) => ({
      onClose: tokenPurchase.closeLastTransaction,
      purchasingTokenSymbol: token.symbol,
      lastTransaction: tokenPurchase.lastTransaction,
    }),
  ),
  observer,
);

export const LastTransaction = enhance(LastTransactionView);
