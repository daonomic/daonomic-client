// @flow
import { observer, inject } from 'mobx-react';
import { Payments as PaymentsView } from './view';

import type { PaymentStore } from '~/stores/payment';
import type { SaleStore } from '~/stores/sale';
import type { Props } from './view';

export const Payments = inject(
  ({ sale, payment }: { payment: PaymentStore, sale: SaleStore }): Props => ({
    tokenSymbol: sale.state.tokenSymbol,
    selectedPaymentMethod: payment.selectedMethod,
    selectedPaymentMethodPayments: payment.selectedMethodPayments,
  }),
)(observer(PaymentsView));
