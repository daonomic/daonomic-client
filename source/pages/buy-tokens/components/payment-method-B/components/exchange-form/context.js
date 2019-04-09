// @flow

import * as React from 'react';
import { compose } from 'ramda';
import { connectContext } from '~/HOC/connect-context';
import raven from 'raven-js';
import debounce from 'debounce-fn';
import { paymentMethodContext } from '../../context';
import { kyberNetworkContext } from '~/domains/business/kyber-network/context';
import { withBonus } from './with-bonus';
import { initialContextValue } from './config';

import type { BonusProps } from './with-bonus';
import type { KyberNetworkCurrency } from '~/domains/business/kyber-network/types';
import * as PaymentMethodTypes from './types';

type Props = {|
  ...BonusProps,
  selectedPaymentMethod: KyberNetworkCurrency,
  isImmediatePurchaseAvailable: boolean,
  costPrecision: number,
  ethRate: number,
  onSubmit: () => void,
  children: React.Node,
  getSellRateToEth: (tokenAddress: string) => number,
  buyTokens: ({ costInEthers: number }) => mixed,
|};

type State = {|
  amount: number,
  cost: number,
  isHydrating: boolean,
  hasError: boolean,
|};

export const exchangeFormContext = React.createContext<PaymentMethodTypes.ExchangeFormContextValue>(
  initialContextValue,
);

class ExchangeFormClass extends React.PureComponent<Props, State> {
  state = {
    amount: 0,
    cost: 0,
    hasError: false,
    isHydrating: false,
  };

  costPrecision: number = 6;

  get formattedCost() {
    const { cost } = this.state;

    return parseFloat(cost.toFixed(this.costPrecision));
  }

  loadBonusDebounced: () => void = debounce(
    () => this.props.loadBonus(this.state.amount),
    {
      wait: 300,
    },
  );

  loadSellRateDebounce = debounce(
    async (prevValue: PaymentMethodTypes.ExchangeFormValue) => {
      const { selectedPaymentMethod, ethRate } = this.props;

      this.setState({
        isHydrating: true,
      });
      try {
        const rate = await this.props.getSellRateToEth(
          selectedPaymentMethod.id,
        );

        const tokenRate = rate * ethRate;

        if (this.state.cost !== prevValue.cost) {
          this.setState(
            {
              isHydrating: false,
              amount: this.state.cost / tokenRate,
            },
            this.loadBonusDebounced,
          );
        } else {
          this.setState(
            {
              isHydrating: false,
              cost: tokenRate * this.state.amount,
            },
            this.loadBonusDebounced,
          );
        }
      } catch (error) {
        this.setState(
          {
            isHydrating: false,
          },
          () => {
            raven.captureBreadcrumb({
              message: 'Calculating sell rates in exchange form',
            });
            raven.captureException(error);
          },
        );
      }
    },
    { wait: 800 },
  );

  handleValue = (value: PaymentMethodTypes.ExchangeFormValue): void => {
    const prevValue = {
      amount: this.state.amount,
      cost: this.state.cost,
    };

    this.setState(
      {
        cost: value.cost,
        amount: value.amount,
      },
      () => {
        this.loadSellRateDebounce(prevValue);
      },
    );
  };

  handleAmount = (event: SyntheticInputEvent<HTMLSelectElement>): void => {
    this.setState(
      {
        amount: Number(event.target.value),
      },
      this.loadSellRateDebounce,
    );
  };

  handleSubmit = (): void => {
    const { buyTokens } = this.props;

    buyTokens({ costInEthers: this.state.cost });
  };

  render() {
    return (
      <exchangeFormContext.Provider
        value={{
          bonus: this.props.bonus,
          onSubmit: this.handleSubmit,
          isImmediatePurchaseAvailable: this.props.isImmediatePurchaseAvailable,
          handleValue: this.handleValue,
          formattedCost: this.formattedCost,
          amount: this.state.amount,
          isHydrating: this.state.isHydrating,
          costPrecision: this.costPrecision,
          cost: this.state.cost,
        }}
      >
        {this.props.children}
      </exchangeFormContext.Provider>
    );
  }
}

const enhance = compose(
  connectContext(paymentMethodContext, (context) => ({
    selectedPaymentMethod: context.selectedPaymentMethod,
    selectedSymbol: context.selectedSymbol,
    isImmediatePurchaseAvailable: context.isImmediatePurchaseAvailable,
    saleId: context.saleId,
    ethRate: context.ethRate,
    buyTokens: context.buyTokens,
  })),
  connectContext(kyberNetworkContext, (context) => ({
    getSellRateToEth: context.getSellRateToEth,
  })),
  withBonus,
);

export const ExchangeForm = enhance(ExchangeFormClass);
