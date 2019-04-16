// @flow

import { compose } from 'ramda';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { TokenPurchaseModalView } from './view';
import { TokenPurchase } from '~/domains/business/token-purchase/store';

const enhance = compose(
  inject(({ tokenPurchase }: {| tokenPurchase: TokenPurchase |}) => ({
    isProcessing: tokenPurchase.isProcessing,
    transactionStatus: tokenPurchase.transactionStatus,
    error: tokenPurchase.error,
    resetState: () => {
      tokenPurchase.resetState();
    },
  })),
  observer,
);

export const TokenPurchaseModal = enhance(TokenPurchaseModalView);
