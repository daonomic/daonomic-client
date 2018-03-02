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
  generate = ({ password }) => {
    const randomWallet = Wallet.createRandom({});

    randomWallet
      .encrypt(password, (progress) => {
        runInAction(() => {
          this.progress = progress;
        });
      })
      .then((encryptedWallet) => {
        console.log(typeof encryptedWallet);
        runInAction(() => {
          this.generatedWallet = {
            ...randomWallet,
            password,
          };
          this.encryptedWallet = encryptedWallet;
        });
      });
  };
}

export default new WalletGenerator();
