// @flow
import { observer, inject } from 'mobx-react';
import { Payments as PaymentsView } from './view';

import type { PaymentStore } from '~/domains/business/payment/store';
import type { SaleStore } from '~/domains/business/sale/store';
import type { Props } from './view';

export const Payments = inject(
  ({ sale, payment }: { payment: PaymentStore, sale: SaleStore }): Props => ({
    tokenSymbol: sale.state.tokenSymbol,
    selectedPaymentMethod: payment.selectedMethod,
    selectedPaymentMethodPayments: payment.selectedMethodPayments,
  }),
)(observer(PaymentsView));
