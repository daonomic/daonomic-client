//@flow
import * as React from 'react';
import { getTranslation } from '~/domains/app/i18n';
import { Heading } from '~/components/heading';
import { PaymentsList } from '~/components/payments-list';
import styles from './styles.css';

import type { PaymentMethod, Payment } from '~/types/payment';

export type Props = {|
  tokenSymbol: string,
  selectedPaymentMethod: ?PaymentMethod,
  selectedPaymentMethodPayments: Payment[],
|};

export class Payments extends React.Component<Props> {
  render() {
    const { selectedPaymentMethod, selectedPaymentMethodPayments } = this.props;

    // fixme: use payment.paymentMethod instead of selectedPaymentMethod.id
    if (selectedPaymentMethodPayments.length === 0 || !selectedPaymentMethod) {
      return null;
    }

    return (
      <React.Fragment>
        <Heading tagName="h3" size="small" className={styles.subtitle}>
          {getTranslation('paymentMethods:transactions')}
        </Heading>

        <PaymentsList
          tokenSymbol={this.props.tokenSymbol}
          payments={selectedPaymentMethodPayments}
          paymentMethod={selectedPaymentMethod}
        />
      </React.Fragment>
    );
  }
}
