// @flow
import Web3 from 'web3';
import { config } from '~/domains/app/config';

export class AppNodeWeb3Service {
  web3: any = new Web3(config.web3AppNodeUrl);

  createContract = (abi: {}[], address: string): any => {
    return new this.web3.eth.Contract(abi, address);
  };
}
