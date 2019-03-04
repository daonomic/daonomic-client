// @flow
import { observer, inject } from 'mobx-react';
import { PaymentMethodView } from './view';

import type { PaymentStore } from '~/domains/business/payment/store';
import type { Props } from './view';

export const PaymentMethod = inject(
  ({ payment }: { payment: PaymentStore }): Props => ({
    selectedPaymentMethod: payment.selectedMethod,
    onMount: payment.loadCurrentMethod,
  }),
)(observer(PaymentMethodView));
