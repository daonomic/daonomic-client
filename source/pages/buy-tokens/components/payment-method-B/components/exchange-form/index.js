// @flow

import React from 'react';
import { compose } from 'ramda';
import { connectContext } from '~/HOC/connect-context';
import { ExchangeFormView } from './view';
import { paymentMethodContext } from '../../context';

type Props = {|
  selectedPaymentMethod: string,
|};

type State = {|
  amount: number,
  cost: number,
|};

class ExchangeFormClass extends React.PureComponent<Props, State> {
  state = {
    amount: 0,
    cost: 0,
  };

  handleCost = (event: SyntheticInputEvent<HTMLSelectElement>): void => {
    const nextCost = Number(event.target.value);

    this.setState({
      amount: this.calculateAmount(nextCost),
      cost: nextCost,
    });
  };

  handleAmount = (event: SyntheticInputEvent<HTMLSelectElement>): void => {
    const nextAmount = Number(event.target.value);

    this.setState({
      cost: this.calculateCost(nextAmount),
      amount: nextAmount,
    });
  };

  calculateAmount = (nextCost: number): number => {
    return;
  };

  calculateCost = (nextAmount: number): number => {
    return;
  };

  render() {
    const { cost, amount } = this.state;

    return (
      <ExchangeFormView
        handleCost={this.handleCost}
        handleAmount={this.handleAmount}
        cost={cost}
        amount={amount}
      />
    );
  }
}

const enhance = compose(
  connectContext(paymentMethodContext, (context) => ({
    selectedPaymentMethod: context.selectedPaymentMethod,
  })),
);

export const ExchangeForm = enhance(ExchangeFormClass);
