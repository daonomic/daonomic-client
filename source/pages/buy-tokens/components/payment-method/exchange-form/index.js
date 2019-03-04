// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import debounce from 'debounce-fn';
import { paymentService } from '~/domains/business/payment';
import { ExchangeFormView } from './view';

import type { ImmediatePurchaseStore } from '~/domains/business/immediate-purchase/store';
import type { PaymentStore } from '~/domains/business/payment/store';
import * as DataStateTypes from '~/domains/data/data-state/types';

type InjectedProps = {|
  paymentMethodId: string,
  isImmediatePurchaseAvailable: boolean,
  checkImmediatePurchaseAvailability(): mixed,
  buyTokens({ costInEthers: number }): mixed,
|};

type ExternalProps = {|
  paymentMethodRate: number,
|};

type Props = InjectedProps & ExternalProps;

type State = {|
  amount: number,
  bonus: DataStateTypes.LoadableData<number>,
|};

class ExchangeFormContainer extends React.Component<Props, State> {
  costPrecision = 6;

  state = {
    amount: 0,
    bonus: { dataState: 'idle' },
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

  loadBonus = debounce(
    async () => {
      const { amount } = this.state;

      this.setState({
        bonus: { dataState: 'loading' },
      });

      try {
        const bonus = await paymentService.determineBonus({ amount });

        if (this.state.amount === amount) {
          this.setState({
            bonus: { dataState: 'loaded', data: bonus },
          });
        }
      } catch (error) {
        this.setState({
          bonus: { dataState: 'failed' },
        });
      }
    },
    { wait: 300 },
  );

  handleChangeAmount = (amount: number) => {
    this.setState(
      {
        amount,
        bonus: { dataState: 'idle' },
      },
      this.loadBonus,
    );
  };

  handleChangeCost = (cost: number) => {
    this.setState(
      {
        amount: cost * this.props.paymentMethodRate,
        bonus: { dataState: 'idle' },
      },
      this.loadBonus,
    );
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
        bonus={
          this.state.bonus.dataState === 'loaded' ? this.state.bonus.data : null
        }
        onChangeAmount={this.handleChangeAmount}
        onChangeCost={this.handleChangeCost}
        isBuyButtonVisible={this.props.isImmediatePurchaseAvailable}
        isKyber={this.props.paymentMethodId === 'ERC20'}
        onBuy={this.handleBuy}
      />
    );
  }
}

export const ExchangeForm: React.ComponentType<ExternalProps> = inject(
  ({
    immediatePurchase,
    payment,
  }: {|
    payment: PaymentStore,
    immediatePurchase: ImmediatePurchaseStore,
  |}): InjectedProps => {
    const paymentMethodId = (payment.selectedMethod || {}).id;

    return {
      paymentMethodId,
      isImmediatePurchaseAvailable:
        (immediatePurchase.isAvailable && paymentMethodId === 'ETH') ||
        paymentMethodId === 'ERC20',
      checkImmediatePurchaseAvailability: immediatePurchase.checkAvailability,
      buyTokens: immediatePurchase.buyTokens,
    };
  },
)(observer(ExchangeFormContainer));
