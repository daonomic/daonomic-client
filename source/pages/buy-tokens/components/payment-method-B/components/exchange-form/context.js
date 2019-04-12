// @flow

import * as React from 'react';
import { compose } from 'ramda';
import { connectContext } from '~/HOC/connect-context';
import { inject } from 'mobx-react';
import raven from 'raven-js';
import debounce from 'debounce-fn';
import { paymentMethodContext } from '~/pages/buy-tokens/components/payment-method-B/context';
import { paymentService } from '~/domains/business/payment/service';
import { purchaseHooksContext } from '~/providers/purchase-hooks';
import { initialContextValue } from './config';

import type { TokenStore } from '~/domains/business/token/store';
import type { PaymentMethodContextValue } from '~/pages/buy-tokens/components/payment-method-B/types';
import type { PurchaseHooksContextValue } from '~/providers/purchase-hooks/types';
import type { PaymentServicePaymentMethod } from '~/domains/business/payment/types';
import * as PaymentMethodTypes from './types';

export type ExternalProps = {|
  saleAddress: string,
  selectedPaymentMethod: PaymentServicePaymentMethod,
  costPrecision: number,
  ethRate: number,
  tokenSymbol: string,
  buyInEth: ({
    cost: number,
  }) => Promise<void>,
  buyInErc20: ({|
    cost: number,
    paymentMethod: PaymentServicePaymentMethod,
  |}) => Promise<void>,
  buyInKyber: ({|
    cost: number,
    paymentMethod: PaymentServicePaymentMethod,
  |}) => Promise<void>,
  getPublicPrice: (symbol: string) => ?number,
  onSubmit: () => void,
  children: React.Node,
  saleAddress: string,
  saleId: string,
  getSellRateToEth: (tokenAddress: string) => number,
|};

type State = {|
  amount: number,
  cost: number,
  hasFetchError: boolean,
  isHydrating: boolean,
  kyberTermsChecked: boolean,
|};

export const exchangeFormContext = React.createContext<PaymentMethodTypes.ExchangeFormContextValue>(
  initialContextValue,
);

class ExchangeFormProviderClass extends React.PureComponent<
  ExternalProps,
  State,
> {
  state = {
    amount: 0,
    kyberTermsChecked: false,
    cost: 0,
    isHydrating: false,
    hasFetchError: false,
  };

  costPrecision: number = 6;

  get formattedCost() {
    const { cost } = this.state;

    return parseFloat(cost.toFixed(this.costPrecision));
  }

  get isKyber() {
    const { selectedPaymentMethod } = this.props;

    return (
      !!selectedPaymentMethod &&
      selectedPaymentMethod.category === 'KYBER_NETWORK'
    );
  }

  get isMaySubmit() {
    const maySubmitBase =
      this.state.cost !== 0 &&
      !this.state.isHydrating &&
      !this.state.hasFetchError;

    if (this.isKyber) {
      return this.state.kyberTermsChecked && maySubmitBase;
    }

    return maySubmitBase;
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

  recalculateValues = debounce(
    async (prevValue: PaymentMethodTypes.ExchangeFormValue) => {
      const { selectedPaymentMethod, saleId, getPublicPrice } = this.props;

      const { amount } = this.state;

      this.setState({
        isHydrating: true,
        hasFetchError: false,
      });
      try {
        let rate;

        if (!selectedPaymentMethod.category === 'KYBER_NETWORK') {
          rate = getPublicPrice(selectedPaymentMethod.id);
        } else {
          const rateResponse = await paymentService.fetchRate(
            {
              address: selectedPaymentMethod.token,
              amount,
            },
            saleId,
          );

          if (!rateResponse.rate) {
            throw new Error('Cant make request now');
          }
          rate = rateResponse.rate;
        }

        if (!rate) {
          throw new Error('Cant perform calculation');
        }

        if (this.state.cost !== prevValue.cost) {
          this.setState({
            isHydrating: false,
            amount: this.state.cost * rate,
          });
        } else {
          this.setState({
            isHydrating: false,
            cost: this.state.amount / rate,
          });
        }
      } catch (error) {
        this.setState(
          {
            isHydrating: false,
            hasFetchError: true,
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
    const { selectedPaymentMethod } = this.props;

    if (!selectedPaymentMethod) {
      return;
    }
    if (selectedPaymentMethod.category === 'ETH') {
      this.props.buyInEth({
        cost: this.state.cost,
      });
    } else if (selectedPaymentMethod.category === 'ERC20') {
      this.props.buyInErc20({
        cost: this.state.cost,
        paymentMethod: selectedPaymentMethod,
      });
    } else if (selectedPaymentMethod.category === 'KYBER_NETWORK') {
      this.props.buyInKyber({
        cost: this.state.cost,
        paymentMethod: selectedPaymentMethod,
      });
    }
  };

  reset = (): void => {
    this.setState({
      amount: 0,
      cost: 0,
    });
  };

  handleKyberTermsCheckedState = (kyberTermsChecked: boolean) => {
    this.setState({
      kyberTermsChecked,
    });
  };

  render() {
    return (
      <exchangeFormContext.Provider
        value={{
          tokenSymbol: this.props.tokenSymbol,
          handleSubmit: this.handleSubmit,
          handleValue: this.handleValue,
          hasFetchError: this.state.hasFetchError,
          formattedCost: this.formattedCost,
          selectedPaymentMethod: this.props.selectedPaymentMethod,
          amount: this.state.amount,
          isHydrating: this.state.isHydrating,
          isMaySubmit: this.isMaySubmit,
          isKyber: this.isKyber,
          costPrecision: this.costPrecision,
          handleKyberTermsCheckedState: this.handleKyberTermsCheckedState,
          kyberTermsChecked: this.state.kyberTermsChecked,
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
  connectContext(
    paymentMethodContext,
    (context: PaymentMethodContextValue) => ({
      selectedPaymentMethod: context.selectedPaymentMethod,
      selectedSymbol: context.selectedSymbol,
      getPublicPrice: context.getPublicPrice,
    }),
  ),
  connectContext(
    purchaseHooksContext,
    (context: PurchaseHooksContextValue) => ({
      buyInEth: context.buyInEth,
      buyInErc20: context.buyInErc20,
      buyInKyber: context.buyInKyber,
    }),
  ),
  inject(({ token }: $Exact<{ token: TokenStore }>) => ({
    saleAddress: (token.sale || {}).data.address,
    saleId: (token.sale || {}).data.id,
  })),
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
