// @flow

import { appNodeWeb3Service } from '~/domains/business/web3/app-node-service';
import { web3Service } from '~/domains/business/web3/service';
import { abiGeneratorService } from '~/domains/business/abi-generator/service';

import type { IImmediatePurchaseService } from '../types';

class ImmediatePurchaseService implements IImmediatePurchaseService {
  getBalanceOfErc20 = async ({
    walletAddress,
    tokenAddress,
  }: {|
    walletAddress: string,
    tokenAddress: string,
  |}): Promise<number> => {
    const contract = appNodeWeb3Service.createContract(
      [abiGeneratorService.createBalanceOfAbi()],
      tokenAddress,
    );

    return contract.methods.balanceOf(walletAddress).call();
  };

  getBalanceOfEth = async ({
    walletAddress,
  }: {|
    walletAddress: string,
  |}): Promise<number> => {
    if (web3Service) {
      return web3Service.web3.eth.getBalance(walletAddress);
    }
    return 0;
  };
}

export const immediatePurchaseService = new ImmediatePurchaseService();
