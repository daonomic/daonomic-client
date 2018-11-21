// @flow
import { observer, inject } from 'mobx-react';
import { PaymentMethodAddress as PaymentMethodAddressView } from './view';

import type { PaymentStore } from '~/stores/payment';
import type { Props } from './view';

export const PaymentMethodAddress = inject(
  ({ payment }: { payment: PaymentStore }): Props => ({
    selectedPaymentMethod: payment.selectedMethod,
    selectedPaymentMethodAddress: payment.selectedMethodAddress,
  }),
)(observer(PaymentMethodAddressView));
