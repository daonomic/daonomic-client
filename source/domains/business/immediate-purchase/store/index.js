// @flow
import raven from 'raven-js';
import Web3 from 'web3';
import { observable, runInAction, reaction } from 'mobx';
import { userData } from '~/domains/business/user-data';
import { web3Service } from '~/domains/business/web3/service';
import { tokenStore, tokenService } from '~/domains/business/token';
import { auth } from '~/domains/business/auth';

function getUserAddress() {
  return userData.model.address || '';
}

export class ImmediatePurchaseStore {
  @observable
  isAvailable = false;

  @observable
  saleContractAddress: ?string = null;

  constructor() {
    const handleAuthChange = () => {
      if (auth.isAuthenticated) {
        this.loadSaleContractAddress();
      }
    };

    reaction(() => auth.isAuthenticated, handleAuthChange);
    handleAuthChange();
  }

  loadSaleContractAddress = async () => {
    await tokenService.loadData();

    const { sale } = tokenStore;

    if (sale) {
      runInAction(() => {
        this.saleContractAddress = sale.data.address;
      });
    }
  };

  checkAvailability = async (): Promise<{ isAvailable: boolean }> => {
    if (!web3Service) {
      return { isAvailable: false };
    }

    try {
      const userWalletAddress = await web3Service.getWalletAddress();
      const isAvailable = !!userWalletAddress;

      runInAction(() => {
        this.isAvailable = isAvailable;
      });

      return { isAvailable };
    } catch (error) {
      raven.captureBreadcrumb({
        message: 'Check immediate purchase availability',
      });
      raven.captureException(error);

      runInAction(() => {
        this.isAvailable = false;
      });

      return {
        isAvailable: false,
      };
    }
  };

  buyTokens = async ({ costInEthers }: { costInEthers: number }) => {
    if (!web3Service) {
      throw new Error('No web3Service');
    }

    try {
      if (!this.saleContractAddress) {
        throw new Error(
          'Cannot buy tokens because sale contract address is unknown',
        );
      }

      const contract = web3Service.createContract(
        [
          {
            constant: false,
            inputs: [
              {
                name: '_beneficiary',
                type: 'address',
              },
            ],
            name: 'buyTokens',
            outputs: [],
            payable: true,
            stateMutability: 'payable',
            type: 'function',
          },
        ],
        this.saleContractAddress,
      );

      const fs = {
        constant: false,
        inputs: [
          { name: '_beneficiary', type: 'address' },
          { name: '_token', type: 'address' },
          { name: '_value', type: 'uint256' },
        ],
        name: 'receiveERC20',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      };

      const userWalletAddress = await web3Service.getWalletAddress();
      const userAddress = getUserAddress();

      const value = Web3.utils.toWei(String(costInEthers));

      await contract.methods.buyTokens(userAddress).send({
        from: userWalletAddress || userAddress,
        value,
      });
    } catch (error) {
      raven.captureBreadcrumb({
        message: 'Token buying',
      });
      raven.captureException(error);

      console.error(error); // eslint-disable-line no-console
    }
  };
}

export const immediatePurchase = new ImmediatePurchaseStore();
