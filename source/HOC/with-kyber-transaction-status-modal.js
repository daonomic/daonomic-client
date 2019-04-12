// @flow

import * as React from 'react';
import { KyberTransactionProcess } from '~/components/kyber-transaction-process';

export const withKyberTransactionStatusModal = (
  Component: React.ComponentType<mixed>,
) => (props: mixed) => (
  <React.Fragment>
    <KyberTransactionProcess />
    <Component {...props} />
  </React.Fragment>
);
