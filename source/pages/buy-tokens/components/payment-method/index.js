// @flow
import { observer, inject } from 'mobx-react';
import PaymentMethodView from './view';

import type { PaymentStore } from '~/stores/payment';
import type { Props } from './view';

export default inject(
  ({ payment }: { payment: PaymentStore }): Props => ({
    selectedPaymentMethod: payment.selectedMethod,
  }),
)(observer(PaymentMethodView));
