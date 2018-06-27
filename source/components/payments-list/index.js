// @flow
import * as React from 'react';
import { getTranslation } from '~/i18n';
import styles from './styles.css';
import { getEtherscanTransactionUrl } from '~/modules/etherscan';

import type { Payment, PaymentMethod } from '~/types/payment';

export type Props = {|
  tokenSymbol: string,
  payments: Payment[],
  paymentMethod: PaymentMethod,
|};

export class PaymentsList extends React.Component<Props> {
  renderPaymentStatus = (payment: Payment) => {
    switch (payment.status) {
      case 'COMPLETED': {
        return 'finished';
      }

      case 'ERROR': {
        return 'error';
      }

      default: {
        return 'pending';
      }
    }
  };

  render() {
    return (
      <ul className={styles.list}>
        {this.props.payments.map((payment) => (
          <li key={payment.txHash} className={styles.item}>
            <p className={styles.cell}>
              {payment.value} {this.props.paymentMethod.id} →{' '}
              {payment.value * this.props.paymentMethod.rate}{' '}
              {this.props.tokenSymbol}
            </p>

            <p className={styles.cell}>
              {getTranslation(
                `paymentsList:${this.renderPaymentStatus(payment)}`,
              )}&nbsp;<a
                href={getEtherscanTransactionUrl(payment.txHash)}
                target="_blank"
                rel="noopener noreferrer"
              >
                [tx]
              </a>
            </p>
          </li>
        ))}
      </ul>
    );
  }
}
