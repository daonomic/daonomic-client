// @flow

import * as React from 'react';

import { compose } from 'ramda';
import raven from 'raven-js';
import { inject } from 'mobx-react';
import { appNodeWeb3Service } from '~/domains/business/web3/app-node-service';
import { web3Service } from '~/domains/business/web3/service';
import { immediatePurchaseService } from '~/domains/business/immediate-purchase';
import { connectContext } from '~/HOC/connect-context';
import { contractProxiesContext } from '~/providers/contract-proxies';
import { toWei } from '~/utils/to-wei';
import { availablePaymentMethodsContext } from '~/providers/available-payment-methods';
import { abiGeneratorService } from '~/domains/business/abi-generator';
import { initialValue } from './config';
import { getUserAddress } from './utils';

import * as PurchaseHooksTypes from './types';
import type { TokenStore } from '~/domains/business/token/store';
import type { ContractProxies } from '~/domains/business/token/types';
import type { PaymentServicePaymentMethod } from '~/domains/business/payment/types';

export const purchaseHooksContext = React.createContext<PurchaseHooksTypes.PurchaseHooksContextValue>(
  initialValue,
);

type State = {|
  transactionStatus: PurchaseHooksTypes.PurchaseHooksTransactionStatus,
  error: ?Error,
  isProcessing: boolean,
|};

type Props = {
  children: (
    context: PurchaseHooksTypes.PurchaseHooksContextValue,
  ) => React.Node,
  saleAddress: string,
  ethPaymentMethod: PaymentServicePaymentMethod,
  defaultPaymentMethod: PaymentServicePaymentMethod,
  contractProxies: ContractProxies,
};

class PurchaseHooksProviderClass extends React.PureComponent<Props, State> {
  state = {
    transactionStatus: {
      state: 'idle',
    },
    error: null,
    isProcessing: false,
  };

  // @note utility function for syntax sugaring
  asyncSetState = (t: $Shape<State>): Promise<void> => {
    return new Promise((resolve) => this.setState(t, resolve));
  };

  get mayPerformPurchase(): boolean {
    return this.state.transactionStatus !== 'idle';
  }

  resetState = (): void => {
    this.setState({
      transactionStatus: {
        state: 'idle',
      },
      error: null,
      isProcessing: false,
    });
  };

  /**
   * @doc hook for buying tokens from
   * ETH wallet
   */

  buyInEth = async ({ cost }: { cost: number }) => {
    try {
      if (!this.mayPerformPurchase) {
        throw new Error('Another transaction already in process');
      }

      if (!web3Service) {
        throw new Error('No web3Service');
      }

      const chain = ['idle', 'balance_checking', 'transfer', 'transfered'];

      await this.asyncSetState({
        isProcessing: true,
        transactionStatus: {
          state: 'balance_checking',
          chain,
        },
      });

      const userAddress =
        (await web3Service.getWalletAddress()) || getUserAddress();

      const userBalance = await immediatePurchaseService.getBalanceOfEth({
        walletAddress: userAddress,
      });

      const costInWei = toWei({
        cost,
        decimals: 18,
      });

      if (userBalance < costInWei) {
        throw new Error("You don't have enough tokens");
      }

      const contract = web3Service.createContract(
        [abiGeneratorService.createBuyTokensAbi()],
        this.props.saleAddress,
      );

      await this.asyncSetState({
        transactionStatus: {
          state: 'transfer',
          chain,
        },
      });

      await contract.methods.buyTokens(userAddress).send({
        from: userAddress,
        value: costInWei,
      });

      await this.asyncSetState({
        transactionStatus: {
          state: 'transfered',
          chain,
        },
      });
    } catch (error) {
      this.setState(
        {
          error,
          transactionStatus: {
            state: 'idle',
          },
        },
        () => {
          raven.captureBreadcrumb({
            message: 'Buying tokens by ETH',
          });
          raven.captureException(error);

          console.error(error);
        },
      );
    }
  };

  /**
   * @doc buying tokens with convertation
   * provided by kyber wrapper (support all ERC20 tokens)
   */

  buyInKyber = async ({ cost, paymentMethod }) => {
    const { contractProxies, saleAddress, defaultPaymentMethod } = this.props;

    try {
      if (!web3Service || !appNodeWeb3Service) {
        throw new Error('No web3Service');
      }

      await this.asyncSetState({
        isProcessing: true,
        transactionStatus: {
          state: 'allowance_checking',
          chain: ['allowance_checking', 'approving', 'transfer', 'transfered'],
        },
      });

      const costInWei = toWei({
        cost,
        decimals: paymentMethod.decimals,
      });

      // web3Service.createBatch(); // @todo batch transaction ?

      const contract = await appNodeWeb3Service.createContract(
        [abiGeneratorService.createAllowanceAbi()],
        paymentMethod.token,
      );

      const userAddress =
        (await web3Service.getWalletAddress()) || getUserAddress();

      const allowed = await contract.methods
        .allowance(userAddress, contractProxies.kyberWrapper)
        .call();

      if (allowed < costInWei) {
        const approveContract = await web3Service.createContract(
          [abiGeneratorService.createApproveAbi()],
          paymentMethod.token,
        );

        await approveContract.methods
          .approve(contractProxies.kyberWrapper, costInWei)
          .send({
            from: userAddress,
          });
      }

      const transferContract = await web3Service.createContract(
        [abiGeneratorService.createTradeAndBuyAbi()],
        contractProxies.kyberWrapper,
      );

      await transferContract.methods
        .tradeAndBuy(
          contractProxies.kyberProxy,
          saleAddress,
          paymentMethod.token,
          costInWei,
          defaultPaymentMethod.token,
          0,
          Math.round(paymentMethod.conversionRate * 0.97 * Math.pow(10, 18)),
          userAddress,
        )
        .send({
          from: userAddress,
          value: 0,
        });
    } catch (error) {
      this.setState(
        {
          error,
          transactionStatus: {
            state: 'idle',
          },
        },
        () => {
          raven.captureBreadcrumb({
            message: 'Buying tokens by Kyber conversion',
          });
          raven.captureException(error);
        },
      );
    }
  };

  /**
   * @doc buying tokens with ERC20 tokens
   */

  buyInErc20 = async ({
    cost,
    paymentMethod,
  }: {|
    cost: number,
    paymentMethod: PaymentServicePaymentMethod,
  |}) => {
    const { saleAddress } = this.props;

    if (!web3Service || !appNodeWeb3Service) {
      throw new Error('No web3Service');
    }

    const costInWei = toWei({
      cost,
      decimals: paymentMethod.decimals,
    });

    const contract = await appNodeWeb3Service.createContract(
      [abiGeneratorService.createAllowanceAbi()],
      paymentMethod.token,
    );

    const userAddress =
      (await web3Service.getWalletAddress()) || getUserAddress();

    try {
      const allowed = await contract.methods
        .allowance(userAddress, saleAddress)
        .call();

      if (allowed < costInWei) {
        const approveContract = await web3Service.createContract(
          [abiGeneratorService.createApproveAbi()],
          paymentMethod.token,
        );

        await approveContract.methods.approve(saleAddress, costInWei).send({
          from: userAddress,
        });
      }

      const transferContract = await web3Service.createContract(
        [abiGeneratorService.createReceiveErc20Abi()],
        saleAddress,
      );

      await transferContract.methods
        .receiveERC20(userAddress, saleAddress, costInWei)
        .send({
          from: userAddress,
          value: costInWei,
        });
    } catch (error) {
      raven.captureBreadcrumb({
        message: 'Buying tokens by ERC20',
      });
      raven.captureException(error);

      console.log(error);
    }
  };

  render() {
    const { children } = this.props;

    return (
      <purchaseHooksContext.Provider
        value={{
          buyInEth: this.buyInEth,
          buyInErc20: this.buyInErc20,
          buyInKyber: this.buyInKyber,
          transactionStatus: this.state.transactionStatus,
          error: this.state.error,
          resetState: this.resetState,
          mayPerformPurchase: this.mayPerformPurchase,
          isProcessing: this.state.isProcessing,
        }}
      >
        {children}
      </purchaseHooksContext.Provider>
    );
  }
}

const enhance = compose(
  connectContext(contractProxiesContext, (context) => ({
    contractProxies: context.contractProxies,
  })),
  connectContext(availablePaymentMethodsContext, (context) => ({
    defaultPaymentMethod: context.defaultPaymentMethod,
    ethPaymentMethod: context.ethPaymentMethod,
  })),
  inject(({ token }: $Exact<{ token: TokenStore }>) => ({
    saleAddress: (token.sale || {}).address,
  })),
);

export const PurchaseHooksProvider = enhance(PurchaseHooksProviderClass);

export const withPurchaseHooksProvider = (
  Component: React.ComponentType<mixed>,
) => {
  return (props: mixed) => (
    <PurchaseHooksProvider>
      <Component {...props} />
    </PurchaseHooksProvider>
  );
};
