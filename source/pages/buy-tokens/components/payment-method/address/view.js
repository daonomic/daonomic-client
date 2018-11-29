//@flow
import * as React from 'react';
import { getTranslation } from '~/domains/app/i18n';
import { getMarker } from '~/utils/get-marker';
import textStyles from '~/components/text/text.css';
import { QrCode } from './qr-code';
import styles from './styles.css';

import * as PaymentMethodTypes from '~/domains/business/payment-method/types';

export type Props = {|
  selectedPaymentMethod: ?PaymentMethodTypes.Data,
  selectedPaymentMethodAddress: ?string,
|};

export class PaymentMethodAddress extends React.Component<Props> {
  marker = getMarker('payment-method-address');

  render() {
    const { selectedPaymentMethod, selectedPaymentMethodAddress } = this.props;

    if (!selectedPaymentMethod || !selectedPaymentMethodAddress) {
      return <div>{getTranslation('common:loading')}...</div>;
    }

    if (selectedPaymentMethod.id === 'ERC20') {
      return null;
    }

    return (
      <div className={styles.root} data-marker={this.marker()}>
        <QrCode data-marker={this.marker('qr')()} />
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
