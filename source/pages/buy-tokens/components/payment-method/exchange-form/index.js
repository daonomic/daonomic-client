// @flow
import * as React from 'react';
import ExchangeFormView from './view';

type Props = {|
  paymentMethodRate: number,
|};

type State = {|
  amount: number,
|};

export default class ExchangeForm extends React.Component<Props, State> {
  state = {
    amount: 0,
  };

  get cost() {
    return this.state.amount / this.props.paymentMethodRate;
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

  render() {
    return (
      <ExchangeFormView
        amount={this.state.amount}
        cost={this.cost}
        onChangeAmount={this.handleChangeAmount}
        onChangeCost={this.handleChangeCost}
      />
    );
  }
}
