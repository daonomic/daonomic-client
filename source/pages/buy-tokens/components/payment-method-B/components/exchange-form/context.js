// @flow

import * as React from 'react';
import { compose } from 'ramda';
import { connectContext } from '~/HOC/connect-context';
import raven from 'raven-js';
import debounce from 'debounce-fn';
import { paymentMethodContext } from '~/pages/buy-tokens/components/payment-method-B/context';
import { paymentService } from '~/domains/business/payment/service';
import { withBonus } from './with-bonus';
import { initialContextValue } from './config';

import type { BonusProps } from './with-bonus';
import * as PaymentTypes from '~/domains/business/payment/types';
import * as PaymentMethodTypes from './types';

type Props = {|
  ...BonusProps,
  selectedPaymentMethod: PaymentTypes.PaymentServicePaymentMethod,
  costPrecision: number,
  ethRate: number,
  tokenSymbol: string,
  onSubmit: () => void,
  children: React.Node,
  getSellRateToEth: (tokenAddress: string) => number,
  buyTokens: ({ costInEthers: number }) => mixed,
|};

type State = {|
  amount: number,
  cost: number,
  isHydrating: boolean,
|};

export const exchangeFormContext = React.createContext<PaymentMethodTypes.ExchangeFormContextValue>(
  initialContextValue,
);

class ExchangeFormProviderClass extends React.PureComponent<Props, State> {
  state = {
    amount: 0,
    cost: 0,
    isHydrating: false,
  };

  costPrecision: number = 6;

  get formattedCost() {
    const { cost } = this.state;

    return parseFloat(cost.toFixed(this.costPrecision));
  }

  componentDidUpdate(prevProps) {
    const { selectedPaymentMethod } = this.props;

    if (prevProps.selectedPaymentMethod !== selectedPaymentMethod) {
      this.recalculateValues({
        cost: this.state.cost,
        amount: this.state.amount,
      });
    }
  }

  loadBonusDebounced: () => void = debounce(
    () => this.props.loadBonus(this.state.amount),
    {
      wait: 300,
    },
  );

  recalculateValues = debounce(
    async (prevValue: PaymentMethodTypes.ExchangeFormValue) => {
      const { selectedPaymentMethod, ethRate } = this.props;
      const { amount } = this.state;

      this.setState({
        isHydrating: true,
      });
      try {
        const rateResponse = await paymentService.fetchRate({
          from: selectedPaymentMethod.id,
          to: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          amount,
        });

        if (!rateResponse.rate) {
          throw new Error(rateResponse.error || 'Cant handle now');
        }

        const tokenRate = rateResponse.rate * ethRate;

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
              cost: this.state.amount * tokenRate,
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
        this.recalculateValues(prevValue);
      },
    );
  };

  handleSubmit = (): void => {
    const { buyTokens } = this.props;

    buyTokens({ costInEthers: this.state.cost });
  };

  reset = (): void => {
    this.setState({
      amount: 0,
      cost: 0,
    });
  };

  render() {
    return (
      <exchangeFormContext.Provider
        value={{
          bonus: this.props.bonus,
          tokenSymbol: this.props.tokenSymbol,
          handleSubmit: this.handleSubmit,
          handleValue: this.handleValue,
          formattedCost: this.formattedCost,
          selectedPaymentMethod: this.props.selectedPaymentMethod,
          amount: this.state.amount,
          isHydrating: this.state.isHydrating,
          costPrecision: this.costPrecision,
          reset: this.reset,
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
    saleId: context.saleId,
    ethRate: context.ethRate,
    buyTokens: context.buyTokens,
  })),
  withBonus,
);

export const ExchangeFormProvider = enhance(ExchangeFormProviderClass);

export const withExchangeFormProvider = (
  Component: React.ComponentType<mixed>,
) => {
  const ComponentWithExchangeFormProvider = ({
    tokenSymbol,
    ...rest
  }: {
    tokenSymbol: string,
  }) => (
    <ExchangeFormProvider tokenSymbol={tokenSymbol}>
      <Component {...rest} />
    </ExchangeFormProvider>
  );

  return ComponentWithExchangeFormProvider;
};
