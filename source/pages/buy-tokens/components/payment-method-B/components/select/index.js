// @flow

import { compose } from 'ramda';
import { availablePaymentMethodsContext } from '~/providers/available-payment-methods';
import { paymentMethodContext } from '~/pages/buy-tokens/components/payment-method-B/context';
import { PaymentMethodSelectView } from './view';
import { connectContext } from '~/HOC/connect-context';

import type { AvailablePaymentMethodsContextValue } from '~/providers/available-payment-methods/types';
import type { PaymentMethodContextValue } from '~/pages/buy-tokens/components/payment-method-B/types';

const enhance = compose(
  connectContext(
    availablePaymentMethodsContext,
    (context: AvailablePaymentMethodsContextValue) => ({
      currencies: context.paymentMethods,
      isLoaded: !!context.paymentMethods,
    }),
  ),
  connectContext(
    paymentMethodContext,
    (context: PaymentMethodContextValue) => ({
      onSelect: context.selectPaymentMethod,
      selectedPaymentMethod: context.selectedPaymentMethod,
      purchasingTokenSymbol: context.purchasingTokenSymbol,
    }),
  ),
);

export const PaymentMethodSelect = enhance(PaymentMethodSelectView);
