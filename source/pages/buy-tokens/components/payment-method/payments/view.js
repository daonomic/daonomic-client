//@flow
import * as React from 'react';
import { getTranslation } from '~/domains/app/i18n';
import { Heading } from '~/components/heading';
import { PaymentsList } from '~/components/payments-list';
import styles from './styles.css';

import type { Payment } from '~/types/payment';
import * as PaymentMethodTypes from '~/domains/business/payment-method/types';

export type Props = {|
  tokenSymbol: string,
  selectedPaymentMethod: ?PaymentMethodTypes.Data,
  selectedPaymentMethodPayments: Payment[],
|};

export class Payments extends React.Component<Props> {
  render() {
    const { selectedPaymentMethod, selectedPaymentMethodPayments } = this.props;

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
