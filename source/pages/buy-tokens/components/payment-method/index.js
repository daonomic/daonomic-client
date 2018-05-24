// @flow
import { observer, inject } from 'mobx-react';
import PaymentMethodView from './view';

import type { KycStore } from '~/stores/kyc';
import type { PaymentStore } from '~/stores/payment';
import type { Props } from './view';

const ObservingPaymentMethodView = observer(PaymentMethodView);

export default inject(
  ({ payment, kyc }: { payment: PaymentStore, kyc: KycStore }): Props => ({
    userWalletAddress: kyc.state.userWalletAddress,
    selectedPaymentMethod: payment.selectedMethod,
    selectedPaymentMethodAddress: payment.selectedMethodAddress,
    selectedPaymentMethodAddressQRCode:
      payment.state.selectedMethodAddressQRCode,
    selectedPaymentMethodPayments: payment.selectedMethodPayments,
    paymentMethods: payment.state.methods,
    onChangePaymentMethod: payment.setMethod,
  }),
)(ObservingPaymentMethodView);
