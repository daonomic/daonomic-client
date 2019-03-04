// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { PaymentMethodSelect as PaymentMethodSelectView } from './view';

import type { PaymentStore } from '~/domains/business/payment/store';
import type { Props } from './view';

type ExternalProps = {|
  marker: Function,
|};

export const PaymentMethodSelect: React.ComponentType<ExternalProps> = inject(
  ({ payment }: { payment: PaymentStore }): $Diff<Props, ExternalProps> => ({
    selectedPaymentMethod: payment.selectedMethod,
    paymentMethods: payment.state.methods,
    onChange: payment.setMethod,
  }),
)(observer(PaymentMethodSelectView));
