// @flow
import { getWeb3Instance } from '~/services/web3/provider';
import { apiProvider } from '~/api';

import type { LoginResponse } from '~/api/types';

const api = apiProvider();

async function loginWithDigitalSignature(): Promise<LoginResponse> {
  try {
    const [web3, messageToSignResponse] = await Promise.all([
      getWeb3Instance(),
      api.auth.getMessageToSign(),
    ]);
    const signature = await web3.eth.personal.sign(
      messageToSignResponse.data.message,
      web3.eth.defaultAccount,
    );
    const { data: loginResponseData } = await api.auth.sendSignedMessage({
      tokenId: messageToSignResponse.data.id,
      signature,
    });

    return loginResponseData;
  } catch (error) {
    console.error('Failed to login with metamask', error); // eslint-disable-line no-console
    throw error;
  }
}

export default loginWithDigitalSignature;
