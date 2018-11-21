// @flow
import { observer, inject } from 'mobx-react';
import { PaymentMethodSelect as PaymentMethodSelectView } from './view';

import type { PaymentStore } from '~/stores/payment';
import type { Props } from './view';

export const PaymentMethodSelect = inject(
  ({ payment }: { payment: PaymentStore }): Props => ({
    selectedPaymentMethod: payment.selectedMethod,
    paymentMethods: payment.state.methods,
    onChange: payment.setMethod,
  }),
)(observer(PaymentMethodSelectView));
