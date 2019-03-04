// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { QrCode as QrCodeView } from './view';

import type { PaymentStore } from '~/domains/business/payment/store';
import type { Props } from './view';

type ExternalProps = {
  className?: string,
};

export const QrCode: React.ComponentType<ExternalProps> = inject(
  ({ payment }: { payment: PaymentStore }): $Diff<Props, ExternalProps> => ({
    qrCode: payment.state.selectedMethodAddressQRCode,
  }),
)(observer(QrCodeView));
