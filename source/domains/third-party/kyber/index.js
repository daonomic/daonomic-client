// @flow
import appConfig from '~/domains/app/config';
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
      throw new Error('Kyber cannot be used on development ethereum network');
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
}: {|
  amount: number,
  saleAddress: string,
|}) {
  return `${appConfig.kyberWidgetUrl}/?mode=tab&network=${networkIdToKyberName(
    expectedEthereumNetwork.id,
  )}&saleAddr=${saleAddress}&amount=${amount}`;
}
