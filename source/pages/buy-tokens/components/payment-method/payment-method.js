import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react';
import Translation from '~/components/translation';
import RenderChildren from '~/components/render-children';
import Panel from '~/components/panel';
import Heading from '~/components/heading';
import Select from '~/components/select';
import textStyles from '~/components/text/text.css';
import styles from './payment-method.css';

const paymentMethodShape = PropTypes.shape({
  id: PropTypes.string,
  label: PropTypes.string,
  address: PropTypes.string,
});

@inject(({ payment, walletAddress }) => ({
  walletAddress: walletAddress.address,
  selectedPaymentMethod: payment.selectedMethod,
  selectedPaymentMethodAddress: payment.selectedMethodAddress,
  selectedPaymentMethodAddressQRCode: payment.selectedMethodAddressQRCode,
  selectedPaymentMethodPayments: payment.selectedMethodPayments,
  paymentMethods: payment.methods,
  onChangePaymentMethod: payment.setMethod,
}))
@observer
export default class PaymentMethod extends Component {
  static propTypes = {
    walletAddress: PropTypes.string.isRequired,
    selectedPaymentMethod: paymentMethodShape.isRequired,
    selectedPaymentMethodAddress: PropTypes.string,
    selectedPaymentMethodPayments: MobxPropTypes.arrayOrObservableArrayOf(PropTypes.shape({
      value: PropTypes.number.isRequired,
      finished: PropTypes.bool.isRequired,
    })).isRequired,
    selectedPaymentMethodAddressQRCode: PropTypes.string,
    paymentMethods: MobxPropTypes.observableArrayOf(paymentMethodShape).isRequired,
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
          <Translation id="paymentMethods:wantToPayWith" />
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
      return `${Translation.text('loading')}...`;
    }

    return (
      <div className={styles['payment-method-address']}>
        {this.renderQRCode()}
        <div>
          <Translation
            id="paymentMethods:sendFundsTo"
            data={{
              paymentMethod: selectedPaymentMethod.label,
            }}
          />
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
      <img className={styles.qrcode} src={selectedPaymentMethodAddressQRCode} alt="qrcode" />
    );
  };

  renderSelectedPaymentMethodPayments = () => {
    const {
      selectedPaymentMethod,
      selectedPaymentMethodPayments,
    } = this.props;

    if (selectedPaymentMethodPayments.length === 0) {
      return null;
    }

    return (
      <RenderChildren>
        <Heading
          tagName="h3"
          size={Heading.sizes.small}
        >
          <Translation id="paymentMethods:statusesTitle" />
        </Heading>

        {selectedPaymentMethodPayments.map((payment) => (
          <div key={payment.id}>
            {payment.value} {selectedPaymentMethod.id}, {payment.finished ? <Translation id="paymentMethods:statusFinished" /> : <Translation id="paymentMethods:statusPending" />}
          </div>
        ))}

        <Panel.Separator />
      </RenderChildren>
    );
  };

  renderInstruction = () => {
    const { walletAddress } = this.props;

    return (
      <RenderChildren>
        <Heading
          tagName="h3"
          size={Heading.sizes.small}
        >
          <Translation id="paymentMethods:instructionTitle" />
        </Heading>

        <div>
          <Translation id="paymentMethods:instructionText" />
          <div className={textStyles['word-break-all']}>
            {walletAddress}
          </div>
        </div>
      </RenderChildren>
    );
  };

  render = () => (
    <Panel paddingSize={Panel.paddingSizes.large}>
      <Heading
        className={styles.title}
        tagName="h2"
        size={Heading.sizes.normal}
      >
        <Translation id="paymentMethods:title" />
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
