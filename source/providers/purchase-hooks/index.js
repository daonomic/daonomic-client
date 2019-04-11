// @flow

import * as React from 'react';

import { compose } from 'ramda';
import raven from 'raven-js';
import { inject } from 'mobx-react';
import { appNodeWeb3Service } from '~/domains/business/web3/app-node-service';
import { web3Service } from '~/domains/business/web3/service';
import { connectContext } from '~/HOC/connect-context';
import { userData as user } from '~/domains/business/user-data/store';
import { contractProxiesContext } from '~/providers/contract-proxies';
import { toWei } from '~/utils/to-wei';
import { availablePaymentMethodsContext } from '~/providers/available-payment-methods';
import { abiGeneratorService } from '~/domains/business/abi-generator';

import type { PurchaseHooksTransactionState } from './types';
import type { TokenStore } from '~/domains/business/token/store';
import type { ContractProxies } from '~/domains/business/token/types';
import type { PurchaseHooksContextValue } from './types';
import type { PaymentServicePaymentMethod } from '~/domains/business/payment/types';

const getUserAddress = () => {
  return user.model.address || '';
};

export const purchaseHooksContext = React.createContext<PurchaseHooksContextValue>(
  {
    buyInEth: null,
    buyInErc20: null,
    buyInKyber: null,
    status: 'idle',
  },
);

type State = {
  status: PurchaseHooksTransactionState,
};

type Props = {
  children: (context: PurchaseHooksContextValue) => React.Node,
  saleAddress: string,
  defaultPaymentMethod: PaymentServicePaymentMethod,
  contractProxies: ContractProxies,
};

class PurchaseHooksProviderClass extends React.PureComponent<Props, State> {
  state = {
    status: 'idle',
  };

  buyInEth = async ({ cost }: { cost: number }) => {
    if (!web3Service) {
      throw new Error('No web3Service');
    }

    const costInWei = toWei({
      cost,
      decimals: 18,
    });

    const contract = web3Service.createContract(
      [abiGeneratorService.createBuyTokensAbi()],
      this.props.saleAddress,
    );

    const userWalletAddress = await web3Service.getWalletAddress();
    const userAddress = getUserAddress();

    await contract.methods.buyTokens(userAddress).send({
      from: userWalletAddress || userAddress,
      value: costInWei,
    });
  };

  buyInKyber = async ({ cost, paymentMethod }) => {
    const { contractProxies, saleAddress, defaultPaymentMethod } = this.props;

    if (!web3Service || !appNodeWeb3Service) {
      throw new Error('No web3Service');
    }

    const costInWei = toWei({
      cost,
      decimals: paymentMethod.decimals,
    });

    web3Service.createBatch();

    const contract = await appNodeWeb3Service.createContract(
      [abiGeneratorService.createAllowanceAbi()],
      paymentMethod.token,
    );

    const userAddress =
      (await web3Service.getWalletAddress()) || getUserAddress();

    try {
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
      raven.captureBreadcrumb({
        message: 'Buying tokens by Kyber',
      });
      raven.captureException(error);

      console.log(error);
    }
  };

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
          status: this.state.status,
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
