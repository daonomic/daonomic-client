import { observable, computed, action, runInAction } from 'mobx';
import { Wallet } from 'ethers-wallet';

export class WalletGenerator {
  @observable generatedWallet = null;
  @observable encryptedWallet = '';
  @observable progress = 0;

  @computed
  get isGenerating() {
    return this.generatedWallet === null && this.progress > 0;
  }

  @computed
  get isGenerated() {
    return this.generatedWallet !== null;
  }

  @action
  generate = async ({ password }) => {
    const randomWallet = Wallet.createRandom({});

    const encryptedWallet = await randomWallet.encrypt(password, (progress) => {
      runInAction(() => {
        this.progress = progress;
      });
    });

    runInAction(() => {
      this.generatedWallet = {
        ...randomWallet,
        password,
      };
      this.encryptedWallet = encryptedWallet;
    });
  };
}

export function walletGeneratorProvider() {
  return new WalletGenerator();
}
