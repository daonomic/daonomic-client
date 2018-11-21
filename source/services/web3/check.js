// @flow
import { expectedEthereumNetwork } from '~/domains/app/config/ethereum-network';
import { getWeb3Instance } from '~/services/web3/provider';

export type Web3CheckErrorCode =
  | 'notAuthenticated'
  | 'invalidNetwork'
  | 'missingWeb3';
export type Web3CheckResult =
  | {
      success: true,
    }
  | {
      success: false,
      errorCode: Web3CheckErrorCode,
    };

function isAuthenticated({ web3 }): boolean {
  return Boolean(web3.eth.defaultAccount);
}

function isOnExpectedEthereumNetwork({ currentEthereumNetworkId }): boolean {
  return (
    String(currentEthereumNetworkId) === String(expectedEthereumNetwork.id)
  );
}

export async function checkWeb3(): Promise<Web3CheckResult> {
  let errorCode: ?Web3CheckErrorCode;

  try {
    const web3 = await getWeb3Instance();
    const currentEthereumNetworkId = await web3.eth.net.getId();

    if (!isAuthenticated({ web3 })) {
      errorCode = 'notAuthenticated';
    } else if (
      !isOnExpectedEthereumNetwork({ web3, currentEthereumNetworkId })
    ) {
      errorCode = 'invalidNetwork';
    }
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    errorCode = 'missingWeb3';
  }

  if (!errorCode) {
    return { success: true };
  }

  return {
    success: false,
    errorCode,
  };
}
