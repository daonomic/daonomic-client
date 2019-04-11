// @flow
import raven from 'raven-js';
import { observable, runInAction, reaction } from 'mobx';
import { web3Service } from '~/domains/business/web3/service';
import { tokenStore, tokenService } from '~/domains/business/token';
import { auth } from '~/domains/business/auth';

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
}

export const immediatePurchase = new ImmediatePurchaseStore();
