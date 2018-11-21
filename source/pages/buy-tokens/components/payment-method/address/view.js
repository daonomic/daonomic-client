//@flow
import * as React from 'react';
import { getTranslation } from '~/domains/app/i18n';
import { QrCode } from './qr-code';
import textStyles from '~/components/text/text.css';
import styles from './styles.css';

import type { PaymentMethod } from '~/types/payment';

export type Props = {|
  selectedPaymentMethod: ?PaymentMethod,
  selectedPaymentMethodAddress: ?string,
|};

export class PaymentMethodAddress extends React.Component<Props> {
  render() {
    const { selectedPaymentMethod, selectedPaymentMethodAddress } = this.props;

    if (!selectedPaymentMethod || !selectedPaymentMethodAddress) {
      return `${getTranslation('common:loading')}...`;
    }

    if (selectedPaymentMethod.id === 'KYBER') {
      return null;
    }

    return (
      <div className={styles.root}>
        <QrCode />
        <div>
          {getTranslation('paymentMethods:sendFundsTo', {
            paymentMethod: selectedPaymentMethod.label,
          })}
          <div className={textStyles['word-break-all']}>
            {selectedPaymentMethodAddress}
          </div>
        </div>
      </div>
    );
  }
}
