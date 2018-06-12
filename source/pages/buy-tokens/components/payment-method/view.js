// @flow
import * as React from 'react';
import { Panel, Select } from '@daonomic/ui';
import Heading from '~/components/heading';
import textStyles from '~/components/text/text.css';
import { getTranslation } from '~/i18n';
import ExchangeForm from './exchange-form';
import styles from './payment-method.css';
import getMarker from '~/utils/get-marker';

import type { PaymentMethodId, PaymentMethod, Payment } from '~/types/payment';

export type Props = {|
  userWalletAddress: string,
  paymentMethods: PaymentMethod[],
  selectedPaymentMethod: ?PaymentMethod,
  selectedPaymentMethodAddress: ?string,
  selectedPaymentMethodPayments: Payment[],
  selectedPaymentMethodAddressQRCode: string,
  onChangePaymentMethod(PaymentMethodId): void,
|};

export default class PaymentMethodView extends React.Component<Props> {
  marker = getMarker('payment-method');

  handleChangePaymentMethod = (
    event: SyntheticInputEvent<HTMLSelectElement>,
  ) => {
    this.props.onChangePaymentMethod(event.target.value);
  };

  renderPaymentMethodsSelect = () => {
    const { paymentMethods, selectedPaymentMethod } = this.props;
    const selectId = 'payment-method';

    if (!selectedPaymentMethod) {
      return;
    }

    return (
      <div className={styles.select}>
        <label className={styles.label} htmlFor={selectId}>
          {getTranslation('paymentMethods:wantToPayWith')}
        </label>

        <Select
          id={selectId}
          value={selectedPaymentMethod.id}
          onChange={this.handleChangePaymentMethod}
        >
          {paymentMethods.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </Select>
      </div>
    );
  };

  renderSelectedPaymentMethodAddress = () => {
    const { selectedPaymentMethod, selectedPaymentMethodAddress } = this.props;

    if (!selectedPaymentMethod || !selectedPaymentMethodAddress) {
      return `${getTranslation('common:loading')}...`;
    }

    return (
      <div className={styles['payment-method-address']}>
        {this.renderQRCode()}
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
  };

  renderQRCode = () => {
    const { selectedPaymentMethodAddressQRCode } = this.props;

    if (!selectedPaymentMethodAddressQRCode) {
      return null;
    }

    return (
      <img
        className={styles.qrcode}
        src={selectedPaymentMethodAddressQRCode}
        alt="qrcode"
      />
    );
  };

  renderSelectedPaymentMethodPayments = () => {
    const { selectedPaymentMethod, selectedPaymentMethodPayments } = this.props;

    // fixme: use payment.paymentMethod instead of selectedPaymentMethod.id
    if (selectedPaymentMethodPayments.length === 0 || !selectedPaymentMethod) {
      return null;
    }

    return (
      <React.Fragment>
        <Heading tagName="h3" size="small">
          {getTranslation('paymentMethods:statusesTitle')}
        </Heading>

        {selectedPaymentMethodPayments.map((payment) => (
          <div key={payment.txHash}>
            {payment.value} {selectedPaymentMethod.id},{' '}
            {getTranslation(
              `paymentMethods:${this.renderPaymentStatus(payment)}`,
            )}
          </div>
        ))}

        <Panel.Separator />
      </React.Fragment>
    );
  };

  renderInstruction = () => {
    const { userWalletAddress } = this.props;

    return (
      <React.Fragment>
        <Heading className={styles.subtitle} tagName="h3" size="small">
          {getTranslation('paymentMethods:instructionTitle')}
        </Heading>

        <p>{getTranslation('paymentMethods:instructionText')}</p>
        <p className={textStyles['word-break-all']}>{userWalletAddress}</p>
      </React.Fragment>
    );
  };

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

  renderExchangeForm = () => {
    if (!this.props.selectedPaymentMethod) {
      return;
    }

    return (
      <ExchangeForm paymentMethodRate={this.props.selectedPaymentMethod.rate} />
    );
  };

  render() {
    return (
      <Panel data-marker={this.marker()}>
        <Heading className={styles.title} tagName="h2" size="normal">
          {getTranslation('paymentMethods:title')}
        </Heading>

        {this.renderPaymentMethodsSelect()}
        <Panel.Separator />
        {this.renderExchangeForm()}
        <Panel.Separator />
        {this.renderSelectedPaymentMethodAddress()}
        <Panel.Separator />
        {this.renderSelectedPaymentMethodPayments()}
        {this.renderInstruction()}
      </Panel>
    );
  }
}
