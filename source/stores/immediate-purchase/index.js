// @flow
import { observable, runInAction } from 'mobx';

import type { IApi } from '~/api/types';
import type { IWeb3 } from '~/types/web3';
import type { KycStore } from '~/stores/kyc';

type GetWeb3Instance = () => Promise<IWeb3>;

export class ImmediatePurchaseStore {
  api: IApi;
  kyc: KycStore;
  getWeb3Instance: GetWeb3Instance;

  @observable isAvailable = false;
  @observable saleContractAddress: ?string = null;

  constructor(options: {
    api: IApi,
    kyc: KycStore,
    getWeb3Instance: GetWeb3Instance,
  }) {
    this.api = options.api;
    this.kyc = options.kyc;
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
      const userWalletAddress = this.kyc.state.userWalletAddress.toLowerCase();
      const isAvailable = web3AccountAddress === userWalletAddress;

      runInAction(() => {
        this.isAvailable = isAvailable;
      });

      return { isAvailable };
    } catch (error) {
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
  kyc: KycStore,
  getWeb3Instance: GetWeb3Instance,
) {
  return new ImmediatePurchaseStore({ api, kyc, getWeb3Instance });
}
