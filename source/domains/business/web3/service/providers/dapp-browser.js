// @flow
import Web3 from 'web3';
import { promisify } from '~/utils/promisify';

import type { IWeb3Service } from '~/domains/business/web3/types';

export class DappWeb3Service implements IWeb3Service {
  web3: any = new Web3(
    Web3.givenProvider || (window.web3 && window.web3.currentProvider),
  );

  getNetworkId = () => {
    return this.web3.eth.net.getId();
  };

  getWalletAddress = (): Promise<string> => {
    return this.web3.eth.getAccounts().then((accounts) => accounts[0]);
  };

  signMessage = async (message: string): Promise<string> => {
    const walletAddress = await this.getWalletAddress();

    return this.web3.eth.personal.sign(message, walletAddress);
  };

  estimateGas = ({ to, data }: {| to: string, data: string |}) => {
    return this.web3.eth.estimateGas({
      to,
      data,
    });
  };

  sendTransaction = async (options: {|
    to: string,
    data: string,
    value?: number,
    gas?: ?number,
  |}) => {
    const sendTransaction = promisify(
      this.web3.eth.sendTransaction.bind(this.web3.eth),
    );
    const walletAddress = await this.getWalletAddress();

    return sendTransaction({ ...options, from: walletAddress });
  };

  createContract = (abi: {}[], address: string) => {
    return new this.web3.eth.Contract(abi, address);
  };

  setDefaultAddress = (address: string) => {
    this.web3.eth.defaultAccount = address;
  };
}
