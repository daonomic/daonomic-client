// @flow

import * as React from 'react';
import { TokenPurchaseModal } from '~/domains/business/token-purchase/react/token-purchase-modal';

export const withTokenPurchaseModal = (
  Component: React.ComponentType<mixed>,
) => (props: mixed) => (
  <React.Fragment>
    <TokenPurchaseModal />
    <Component {...props} />
  </React.Fragment>
);
