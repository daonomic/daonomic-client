// @flow

import { compose } from 'ramda';
import { connectContext } from '~/HOC/connect-context';
import { withMarkerTreeProvider } from '~/providers/marker-tree';
import * as paymentContext from './context';
import { PaymentMethodView } from './view';

import type { PaymentMethodContextValue } from './types';

export const PaymentMethod = compose(
  paymentContext.withPaymentMethodProvider,
  connectContext(
    paymentContext.paymentMethodContext,
    (context: PaymentMethodContextValue) => ({
      displayAddress: context.displayAddress,
    }),
  ),
  withMarkerTreeProvider('payment-method'),
)(PaymentMethodView);
