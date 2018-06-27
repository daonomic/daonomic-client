// @flow
import { observer, inject } from 'mobx-react';
import PaymentMethodView from './view';

import type { UserDataStore } from '~/modules/user-data/store';
import type { PaymentStore } from '~/stores/payment';
import type { SaleStore } from '~/stores/sale';
import type { Props } from './view';

const ObservingPaymentMethodView = observer(PaymentMethodView);

export default inject(
  ({
    sale,
    payment,
    userData,
  }: {
    payment: PaymentStore,
    userData: UserDataStore,
    sale: SaleStore,
  }): Props => ({
    tokenSymbol: sale.state.tokenSymbol,
    userWalletAddress: userData.model.address,
    selectedPaymentMethod: payment.selectedMethod,
    selectedPaymentMethodAddress: payment.selectedMethodAddress,
    selectedPaymentMethodAddressQRCode:
      payment.state.selectedMethodAddressQRCode,
    selectedPaymentMethodPayments: payment.selectedMethodPayments,
    paymentMethods: payment.state.methods,
    onChangePaymentMethod: payment.setMethod,
  }),
)(ObservingPaymentMethodView);
