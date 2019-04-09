// @flow
import Web3 from 'web3';
import { promisify } from '~/utils/promisify';
import { isWeb3Installed } from '~/utils/is-web3-installed';

import type { IWeb3Service } from '~/domains/business/web3/types';

export class DappWeb3Service implements IWeb3Service {
  web3instance: any;
  isWeb3Installed: boolean = isWeb3Installed();

  get web3() {
    if (!this.web3instance) {
      this.web3instance = new Web3(
        Web3.givenProvider || (window.web3 && window.web3.currentProvider),
      );
    }

    return this.web3instance;
  }

  getNetworkId = () => {
    return this.web3.eth.net.getId();
  };

  getWalletAddress = () => {
    return this.web3.eth.getAccounts().then((accounts) => accounts[0]);
  };

  signMessage = async (message) => {
    const walletAddress = await this.getWalletAddress();

    return this.web3.eth.personal.sign(message, walletAddress);
  };

  estimateGas = ({ to, data }) => {
    return this.web3.eth.estimateGas({
      to,
      data,
    });
  };

  sendTransaction = async (options) => {
    const sendTransaction = promisify(
      this.web3.eth.sendTransaction.bind(this.web3.eth),
    );
    const walletAddress = await this.getWalletAddress();

    return sendTransaction({ ...options, from: walletAddress });
  };

  createContract = (abi, address) => {
    return new this.web3.eth.Contract(abi, address);
  };

  setDefaultAddress = (address) => {
    this.web3.eth.defaultAccount = address;
  };
}
