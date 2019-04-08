// @flow

import { compose } from 'ramda';
import { withMarkerTreeProvider } from '~/providers/marker-tree';
import { withPaymentMethodProvider } from './context';
import { PaymentMethodView } from './view';

export const PaymentMethod = compose(
  withPaymentMethodProvider,
  withMarkerTreeProvider('payment-method'),
)(PaymentMethodView);
