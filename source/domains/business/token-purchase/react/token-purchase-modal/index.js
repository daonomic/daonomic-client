// @flow

import { compose } from 'ramda';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { withMarkerTreeProvider } from '~/providers/marker-tree';
import { TokenPurchaseModalView } from './view';
import { TokenPurchase } from '~/domains/business/token-purchase/store';

const enhance = compose(
  withMarkerTreeProvider('payment-modal'),
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
