import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react';
import { Panel, Select } from '@daonomic/ui';
import Heading from '~/components/heading';
import textStyles from '~/components/text/text.css';
import styles from './payment-method.css';
import { getTranslation } from '~/i18n';

const paymentMethodShape = PropTypes.shape({
  id: PropTypes.string,
  label: PropTypes.string,
  address: PropTypes.string,
});

@observer
class PaymentMethod extends Component {
  static propTypes = {
    walletAddress: PropTypes.string.isRequired,
    selectedPaymentMethod: paymentMethodShape.isRequired,
    selectedPaymentMethodAddress: PropTypes.string,
    selectedPaymentMethodPayments: MobxPropTypes.arrayOrObservableArrayOf(
      PropTypes.shape({
        value: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
      }),
    ).isRequired,
    selectedPaymentMethodAddressQRCode: PropTypes.string,
    paymentMethods: MobxPropTypes.observableArrayOf(paymentMethodShape)
      .isRequired,
    onChangePaymentMethod: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedPaymentMethodAddress: '',
    selectedPaymentMethodAddressQRCode: '',
  };

  handleChangePaymentMethod = (event) => {
    this.props.onChangePaymentMethod(event.target.value);
  };

  renderPaymentMethodsSelect = () => {
    const { paymentMethods, selectedPaymentMethod } = this.props;
    const selectId = 'payment-method';

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

    if (!selectedPaymentMethodAddress) {
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

    if (selectedPaymentMethodPayments.length === 0) {
      return null;
    }

    return (
      <Fragment>
        <Heading tagName="h3" size="small">
          {getTranslation('paymentMethods:statusesTitle')}
        </Heading>

        {selectedPaymentMethodPayments.map((payment) => (
          <div key={payment.id}>
            {payment.value} {selectedPaymentMethod.id},{' '}
            {getTranslation(
              `paymentMethods:${this.renderPaymentStatus(payment)}`,
            )}
          </div>
        ))}

        <Panel.Separator />
      </Fragment>
    );
  };

  renderInstruction = () => {
    const { walletAddress } = this.props;

    return (
      <Fragment>
        <Heading tagName="h3" size="small">
          {getTranslation('paymentMethods:instructionTitle')}
        </Heading>

        <div>
          {getTranslation('paymentMethods:instructionText')}
          <div className={textStyles['word-break-all']}>{walletAddress}</div>
        </div>
      </Fragment>
    );
  };

  renderPaymentStatus = (payment) => {
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
      <Panel>
        <Heading className={styles.title} tagName="h2" size="normal">
          {getTranslation('paymentMethods:title')}
        </Heading>

        {this.renderPaymentMethodsSelect()}
        <Panel.Separator />
        {this.renderSelectedPaymentMethodAddress()}
        <Panel.Separator />
        {this.renderSelectedPaymentMethodPayments()}
        {this.renderInstruction()}
      </Panel>
    );
  }
}

export default inject(({ payment, kyc }) => ({
  walletAddress: kyc.state.userWalletAddress,
  selectedPaymentMethod: payment.selectedMethod,
  selectedPaymentMethodAddress: payment.selectedMethodAddress,
  selectedPaymentMethodAddressQRCode: payment.state.selectedMethodAddressQRCode,
  selectedPaymentMethodPayments: payment.selectedMethodPayments,
  paymentMethods: payment.state.methods,
  onChangePaymentMethod: payment.setMethod,
}))(PaymentMethod);
