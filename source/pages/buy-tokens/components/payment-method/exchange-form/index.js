// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import ExchangeFormView from './view';

import type { ImmediatePurchaseStore } from '~/stores/immediate-purchase';
import type { PaymentStore } from '~/stores/payment';

type InjectedProps = {|
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
  state = {
    amount: 0,
  };

  get cost() {
    return this.state.amount / this.props.paymentMethodRate;
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
        onChangeAmount={this.handleChangeAmount}
        onChangeCost={this.handleChangeCost}
        isBuyButtonVisible={this.props.isImmediatePurchaseAvailable}
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
    isImmediatePurchaseAvailable:
      immediatePurchase.isAvailable &&
      (payment.selectedMethod || {}).id === 'ETH',
    checkImmediatePurchaseAvailability: immediatePurchase.checkAvailability,
    buyTokens: immediatePurchase.buyTokens,
  }),
)(ObservingExchangeForm);
