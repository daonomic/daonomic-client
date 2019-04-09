// @flow

import * as React from 'react';
import { PaymentMethodAddressView } from './view';
import { connectContext } from '~/HOC/connect-context';
import { paymentMethodContext } from '~/pages/buy-tokens/components/payment-method-B/context';
import { compose } from 'ramda';

import type { PaymentMethodContextValue } from '~/pages/buy-tokens/components/payment-method-B/context';

const enhance = compose(
  connectContext(
    paymentMethodContext,
    (context: PaymentMethodContextValue) => ({
      paymentMethodAddress: context.selectedMethodAddress,
      paymentMethodSymbol: context.selectedSymbol,
    }),
  ),
);

export const PaymentMethodAddress: React.ComponentType<mixed> = enhance(
  PaymentMethodAddressView,
);
