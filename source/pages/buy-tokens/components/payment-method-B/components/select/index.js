// @flow

import { compose } from 'ramda';
import { kyberNetworkContext } from '~/domains/business/kyber-network/context';
import { PaymentMethodSelectView } from './view';
import { paymentMethodContext } from '../../context';
import { connectContext } from '~/HOC/connect-context';

const enhance = compose(
  connectContext(kyberNetworkContext, (context) => ({
    currencies: context.currencies.data,
    isLoaded: context.currencies.dataState === 'loaded',
  })),
  connectContext(paymentMethodContext, (context) => ({
    onSelect: context.selectPaymentMethod,
    selectedPaymentMethod: context.selectedPaymentMethod,
  })),
);

export const PaymentMethodSelect = enhance(PaymentMethodSelectView);
