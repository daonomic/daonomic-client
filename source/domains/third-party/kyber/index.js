// @flow
import { config } from '~/domains/app/config';
import {
  expectedEthereumNetwork,
  type EthereumNetworkId,
} from '~/domains/app/config/ethereum-network';

function networkIdToKyberName(id: EthereumNetworkId) {
  switch (id) {
    case '1': {
      return 'mainnet';
    }

    case '3': {
      return 'ropsten';
    }

    case '17': {
      return 'none';
    }

    default: {
      (id: empty);
      return 'none';
    }
  }
}

export function getKyberWidgetUrl({
  amount,
  saleAddress,
  buyerAddress,
}: {|
  amount: number,
  saleAddress: string,
  buyerAddress: string,
|}) {
  return `${config.kyberWidgetUrl}/?mode=tab&network=${networkIdToKyberName(
    expectedEthereumNetwork.id,
  )}&saleAddr=${saleAddress}&buyerAddr=${buyerAddress}&amount=${amount}`;
}
