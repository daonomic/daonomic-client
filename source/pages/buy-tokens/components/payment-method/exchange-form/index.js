// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import ExchangeFormView from './view';

import type { ImmediatePurchaseStore } from '~/stores/immediate-purchase';
import type { PaymentStore } from '~/stores/payment';

type InjectedProps = {|
  paymentMethodId: string,
  isImmediatePurchaseAvailable: boolean,
  checkImmediatePurchaseAvailability(): mixed,
  buyTokens({ costInEthers: number }): mixed,
|};

type Props = InjectedProps & {|
  paymentMethodRate: number,
|};

type State = {|
  amount: number,
|};

class ExchangeForm extends React.Component<Props, State> {
  costPrecision = 6;
  state = {
    amount: 0,
  };

  get cost() {
    return parseFloat(
      (this.state.amount / this.props.paymentMethodRate).toFixed(
        this.costPrecision,
      ),
    );
  }

  componentDidMount() {
    this.props.checkImmediatePurchaseAvailability();
  }

  handleChangeAmount = (amount: number) => {
    this.setState({
      amount,
    });
  };

  handleChangeCost = (cost: number) => {
    this.setState({
      amount: cost * this.props.paymentMethodRate,
    });
  };

  handleBuy = () => {
    this.props.buyTokens({ costInEthers: this.cost });
  };

  render() {
    return (
      <ExchangeFormView
        amount={this.state.amount}
        cost={this.cost}
        costPrecision={this.costPrecision}
        onChangeAmount={this.handleChangeAmount}
        onChangeCost={this.handleChangeCost}
        isBuyButtonVisible={this.props.isImmediatePurchaseAvailable}
        isKyber={this.props.paymentMethodId === 'KYBER'}
        onBuy={this.handleBuy}
      />
    );
  }
}

const ObservingExchangeForm = observer(ExchangeForm);

export default inject(
  ({
    immediatePurchase,
    payment,
  }: {
    payment: PaymentStore,
    immediatePurchase: ImmediatePurchaseStore,
  }): InjectedProps => ({
    paymentMethodId: (payment.selectedMethod || {}).id,
    isImmediatePurchaseAvailable:
      immediatePurchase.isAvailable &&
      ['ETH', 'KYBER'].includes((payment.selectedMethod || {}).id),
    checkImmediatePurchaseAvailability: immediatePurchase.checkAvailability,
    buyTokens: immediatePurchase.buyTokens,
  }),
)(ObservingExchangeForm);
