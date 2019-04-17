// @flow

import { tokenPurchase } from '~/domains/business/token-purchase/store';
import { web3Service } from '~/domains/business/web3/service';
import { appNodeWeb3Service } from '~/domains/business/web3/app-node-service';
import { abiGeneratorService } from '~/domains/business/abi-generator/service';
import { toWei } from '~/utils/to-wei';
import { userData } from '~/domains/business/user-data/store';
import { logger } from '~/domains/app/logger';
import { tokenStore } from '~/domains/business/token/store';
import { immediatePurchaseService } from '~/domains/business/immediate-purchase/service';

import type { ITokenPurcahseService } from '~/domains/business/token-purchase/types';

class TokenPurchaseService implements ITokenPurcahseService {
  buyInEth = async ({ cost }) => {
    try {
      const chain = ['balance_checking', 'transfer', 'awaiting_confirmation'];

      if (!tokenPurchase.mayUserPerformTransaction) {
        throw new Error('Another transaction already in process');
      }

      await tokenPurchase.purchasingStart({
        state: 'balance_checking',
        chain,
      });

      if (!web3Service) {
        throw new Error('No web3Service');
      }

      const web3UserAddress = await web3Service.getWalletAddress();
      const userAddress = userData.model.address;

      const saleAddress = tokenStore.saleAddress;

      if (!saleAddress) {
        throw new Error('No sale address provided');
      }

      const userBalance = await immediatePurchaseService.getBalanceOfEth({
        walletAddress: web3UserAddress,
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
        saleAddress,
      );

      await tokenPurchase.updateTransactionStatus({
        state: 'transfer',
        chain,
      });

      await contract.methods
        .buyTokens(userAddress)
        .send({
          from: web3UserAddress,
          value: costInWei,
        })
        .on('transactionHash', () => {
          tokenPurchase.updateTransactionStatus({
            state: 'awaiting_confirmation',
            chain,
          });
        });

      await tokenPurchase.purchasingDone();

      return true;
    } catch (error) {
      await tokenPurchase.purchasingAbort(error);

      logger.logError(error);

      return false;
    }
  };

  buyInKyber = async ({ cost, paymentMethod }) => {
    try {
      const sale = tokenStore.sale;

      const chain = [
        'balance_checking',
        'allowance_checking',
        'approving',
        'awaiting_approving',
        'transfer',
        'awaiting_confirmation',
      ];

      if (!tokenPurchase.mayUserPerformTransaction) {
        throw new Error('Another transaction already in process');
      }

      if (!web3Service || !appNodeWeb3Service) {
        throw new Error('No web3Service');
      }

      if (!sale) {
        throw new Error('Theres no sale');
      }

      const defaultPaymentMethod = sale.defaultPaymentMethod;

      if (!defaultPaymentMethod) {
        throw new Error('Theres no default payment method');
      }

      await tokenPurchase.purchasingStart({
        state: 'balance_checking',
        chain,
      });

      const web3UserAddress = await web3Service.getWalletAddress();
      const userAddress = userData.model.address;

      const saleAddress = tokenStore.saleAddress;

      if (!saleAddress) {
        throw new Error('No sale address provided');
      }

      const costInWei = toWei({
        cost,
        decimals: paymentMethod.decimals,
      });

      const userBalance = await immediatePurchaseService.getBalanceOfErc20({
        walletAddress: web3UserAddress,
        tokenAddress: paymentMethod.token,
      });

      if (userBalance < costInWei) {
        throw new Error(`You don't have enough ${paymentMethod.id} tokens`);
      }

      await tokenPurchase.updateTransactionStatus({
        state: 'allowance_checking',
        chain,
      });

      const contract = await appNodeWeb3Service.createContract(
        [abiGeneratorService.createAllowanceAbi()],
        paymentMethod.token,
      );

      const { kyberWrapper, kyberProxy } = tokenStore.contracts || {};

      if (!kyberWrapper || !kyberProxy) {
        throw new Error(
          'Kyber wrapper or proxy address is not provided. Please contact support',
        );
      }

      const allowed = await contract.methods
        .allowance(userAddress, kyberWrapper)
        .call();

      await tokenPurchase.updateTransactionStatus({
        state: 'approving',
        chain,
      });

      if (allowed < costInWei) {
        const approveContract = await web3Service.createContract(
          [abiGeneratorService.createApproveAbi()],
          paymentMethod.token,
        );

        await approveContract.methods
          .approve(kyberWrapper, costInWei)
          .send({
            from: web3UserAddress,
          })
          .on('transactionHash', () => {
            tokenPurchase.updateTransactionStatus({
              state: 'awaiting_approving',
              chain,
            });
          });
      }

      await tokenPurchase.updateTransactionStatus({
        state: 'transfer',
        chain,
      });

      const transferContract = await web3Service.createContract(
        [abiGeneratorService.createTradeAndBuyAbi()],
        kyberWrapper,
      );

      await transferContract.methods
        .tradeAndBuy(
          kyberProxy,
          saleAddress,
          paymentMethod.token,
          costInWei,
          defaultPaymentMethod.token,
          '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
          Math.round(paymentMethod.conversionRate * 0.97 * Math.pow(10, 18)),
          userAddress,
        )
        .send({
          from: web3UserAddress,
          value: 0,
        })
        .on('transactionHash', () => {
          tokenPurchase.updateTransactionStatus({
            state: 'awaiting_confirmation',
            chain,
          });
        });

      await tokenPurchase.purchasingDone();

      return true;
    } catch (error) {
      await tokenPurchase.purchasingAbort(error);

      logger.logError(error);

      return false;
    }
  };

  buyInErc20 = async ({ cost, paymentMethod }) => {
    try {
      const chain = [
        'balance_checking',
        'allowance_checking',
        'approving',
        'awaiting_approving',
        'transfer',
        'awaiting_confirmation',
      ];

      if (!tokenPurchase.mayUserPerformTransaction) {
        throw new Error('Another transaction already in process');
      }

      if (!web3Service || !appNodeWeb3Service) {
        throw new Error('No web3Service');
      }

      await tokenPurchase.purchasingStart({
        state: 'balance_checking',
        chain,
      });

      const web3UserAddress = await web3Service.getWalletAddress();
      const userAddress = userData.model.address;

      const saleAddress = tokenStore.saleAddress;

      if (!saleAddress) {
        throw new Error('No sale address provided');
      }

      const costInWei = toWei({
        cost,
        decimals: paymentMethod.decimals,
      });

      const userBalance = await immediatePurchaseService.getBalanceOfErc20({
        walletAddress: web3UserAddress,
        tokenAddress: paymentMethod.token,
      });

      if (userBalance < costInWei) {
        throw new Error(`You don't have enough ${paymentMethod.id} tokens`);
      }

      await tokenPurchase.updateTransactionStatus({
        state: 'allowance_checking',
        chain,
      });

      const contract = await appNodeWeb3Service.createContract(
        [abiGeneratorService.createAllowanceAbi()],
        paymentMethod.token,
      );

      const allowed = await contract.methods
        .allowance(web3UserAddress, saleAddress)
        .call();

      await tokenPurchase.updateTransactionStatus({
        state: 'approving',
        chain,
      });

      if (allowed < costInWei) {
        const approveContract = await web3Service.createContract(
          [abiGeneratorService.createApproveAbi()],
          paymentMethod.token,
        );

        await approveContract.methods
          .approve(saleAddress, costInWei)
          .send({
            from: web3UserAddress,
          })
          .on('transactionHash', () => {
            tokenPurchase.updateTransactionStatus({
              state: 'awaiting_approving',
              chain,
            });
          });
      }

      await tokenPurchase.updateTransactionStatus({
        state: 'transfer',
        chain,
      });

      const transferContract = await web3Service.createContract(
        [abiGeneratorService.createReceiveErc20Abi()],
        saleAddress,
      );

      await transferContract.methods
        .receiveERC20(userAddress, paymentMethod.token, costInWei)
        .send({
          from: web3UserAddress,
        })
        .on('transactionHash', () => {
          tokenPurchase.updateTransactionStatus({
            state: 'awaiting_confirmation',
            chain,
          });
        });

      await tokenPurchase.purchasingDone();

      return true;
    } catch (error) {
      await tokenPurchase.purchasingAbort(error);

      logger.logError(error);

      return false;
    }
  };
}

export const tokenPurchaseService = new TokenPurchaseService();
