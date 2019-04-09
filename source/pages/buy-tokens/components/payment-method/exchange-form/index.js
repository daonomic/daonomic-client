// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import debounce from 'debounce-fn';
import { web3Service } from '~/domains/business/web3/service';
import { paymentService } from '~/domains/business/payment';
import { ExchangeFormView } from './view';

import type { ImmediatePurchaseStore } from '~/domains/business/immediate-purchase/store';
import * as DataStateTypes from '~/domains/data/data-state/types';

type InjectedProps = {|
  buyTokens({ costInEthers: number }): mixed,
  checkImmediatePurchaseAvailability(): Promise<{ isAvailable: boolean }>,
  isImmediatePurchaseAvailable: boolean,
|};

type ExternalProps = {|
  saleId: string,
  paymentMethodRate: number,
  paymentMethodId: string,
|};

type Props = InjectedProps & ExternalProps;

type State = {|
  amount: number,
  displayWeb3NotificationModal: boolean,
  bonus: DataStateTypes.LoadableData<number>,
|};

class ExchangeFormContainer extends React.Component<Props, State> {
  costPrecision = 6;

  state = {
    amount: 0,
    displayWeb3NotificationModal: false,
    bonus: { dataState: 'idle' },
  };

  get cost() {
    return parseFloat(
      (this.state.amount / this.props.paymentMethodRate).toFixed(
        this.costPrecision,
      ),
    );
  }

  loadBonus = debounce(
    async () => {
      const { amount } = this.state;

      this.setState({
        bonus: { dataState: 'loading' },
      });

      try {
        const bonus = await paymentService.determineBonus({
          amount,
          saleId: this.props.saleId,
        });

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

  handleBuy = async (): Promise<void> => {
    const {
      checkImmediatePurchaseAvailability,
      buyTokens,
      isImmediatePurchaseAvailable,
    } = this.props;

    if (!web3Service || !web3Service.isWeb3Installed) {
      this.handleWeb3Notification(true);
      return;
    }

    if (!isImmediatePurchaseAvailable) {
      const { isAvailable } = await checkImmediatePurchaseAvailability();

      if (isAvailable) {
        await buyTokens({ costInEthers: this.cost });
      }
    } else {
      await buyTokens({ costInEthers: this.cost });
    }
  };

  handleWeb3Notification = (open: boolean): void => {
    return this.setState({
      displayWeb3NotificationModal: open,
    });
  };

  render() {
    return (
      <ExchangeFormView
        amount={this.state.amount}
        handleWeb3Notification={this.handleWeb3Notification}
        displayWeb3NotificationModal={this.state.displayWeb3NotificationModal}
        cost={this.cost}
        costPrecision={this.costPrecision}
        bonus={
          this.state.bonus.dataState === 'loaded' ? this.state.bonus.data : null
        }
        onChangeAmount={this.handleChangeAmount}
        onChangeCost={this.handleChangeCost}
        isKyber={this.props.paymentMethodId === 'ERC20'}
        onBuy={this.handleBuy}
      />
    );
  }
}

export const ExchangeForm: React.ComponentType<ExternalProps> = inject(
  (
    {
      immediatePurchase,
    }: {|
      immediatePurchase: ImmediatePurchaseStore,
    |},
    { paymentMethodId }: ExternalProps,
  ): InjectedProps => {
    return {
      isImmediatePurchaseAvailable:
        (immediatePurchase.isAvailable && paymentMethodId === 'ETH') ||
        paymentMethodId === 'ERC20',
      checkImmediatePurchaseAvailability: immediatePurchase.checkAvailability,
      buyTokens: immediatePurchase.buyTokens,
    };
  },
)(observer(ExchangeFormContainer));
