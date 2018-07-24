// @flow
import raven from 'raven-js';
import { observable, runInAction } from 'mobx';
import { userData } from '~/modules/user-data/store';

import type { IApi } from '~/api/types';
import type { IWeb3 } from '~/types/web3';

type GetWeb3Instance = () => Promise<IWeb3>;

export class ImmediatePurchaseStore {
  api: IApi;
  getWeb3Instance: GetWeb3Instance;

  @observable isAvailable = false;
  @observable saleContractAddress: ?string = null;

  constructor(options: { api: IApi, getWeb3Instance: GetWeb3Instance }) {
    this.api = options.api;
    this.getWeb3Instance = options.getWeb3Instance;
    this.loadSaleContractAddress();
  }

  loadSaleContractAddress = async () => {
    const { data } = await this.api.getSaleInfo();

    runInAction(() => {
      this.saleContractAddress = data.address;
    });
  };

  checkAvailability = async (): Promise<{ isAvailable: boolean }> => {
    try {
      const web3 = await this.getWeb3Instance();
      const web3AccountAddress = (web3.eth.defaultAccount || '').toLowerCase();
      const userWalletAddress = (userData.model.address || '').toLowerCase();
      const isAvailable = web3AccountAddress === userWalletAddress;

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
    try {
      const web3 = await this.getWeb3Instance();

      if (!this.saleContractAddress) {
        throw new Error(
          'Cannot buy tokens because sale contract address is unknown',
        );
      }

      await web3.eth.sendTransaction({
        to: this.saleContractAddress,
        value: web3.utils.toWei(String(costInEthers)),
      });
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  };
}

export function immediatePurchaseProvider(
  api: IApi,
  getWeb3Instance: GetWeb3Instance,
) {
  return new ImmediatePurchaseStore({ api, getWeb3Instance });
}
