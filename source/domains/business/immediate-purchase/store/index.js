// @flow
import raven from 'raven-js';
import Web3 from 'web3';
import { observable, runInAction } from 'mobx';
import { userData } from '~/modules/user-data/store';
import { web3Service } from '~/domains/business/web3/service';

import type { IApi } from '~/domains/app/api/types';

function getUserAddress() {
  return userData.model.address || '';
}

export class ImmediatePurchaseStore {
  api: IApi;

  @observable
  isAvailable = false;

  @observable
  saleContractAddress: ?string = null;

  constructor(options: { api: IApi }) {
    this.api = options.api;
    this.loadSaleContractAddress();
  }

  loadSaleContractAddress = async () => {
    const { data } = await this.api.getSaleInfo();

    runInAction(() => {
      this.saleContractAddress = data.address;
    });
  };

  checkAvailability = async (): Promise<{ isAvailable: boolean }> => {
    if (!web3Service) {
      return { isAvailable: false };
    }

    try {
      const userWalletAddress = web3Service.getWalletAddress();
      const isAvailable = userWalletAddress !== '';

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
      const userWalletAddress = await web3Service.getWalletAddress();

      const userAddress = getUserAddress();

      await contract.methods.buyTokens(getUserAddress()).send({
        from: userWalletAddress || userAddress,
        value: Web3.utils.toWei(String(costInEthers)),
      });
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  };
}
