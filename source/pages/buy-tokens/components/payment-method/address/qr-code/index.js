// @flow
import { observer, inject } from 'mobx-react';
import { QrCode as QrCodeView } from './view';

import type { PaymentStore } from '~/stores/payment';
import type { Props } from './view';

export const QrCode = inject(
  ({ payment }: { payment: PaymentStore }): Props => ({
    qrCode: payment.state.selectedMethodAddressQRCode,
  }),
)(observer(QrCodeView));
