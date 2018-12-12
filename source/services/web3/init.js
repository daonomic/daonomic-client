// @flow
import { loadWeb3 } from './load';
import { setDefaultAccount } from './set-default-account';

let instantiatedWeb3 = null;

export async function initWeb3() {
  if (instantiatedWeb3) {
    return instantiatedWeb3;
  } else if (!window.web3) {
    throw new Error('Failed to find web3 provider');
  }

  const Web3 = await loadWeb3();

  instantiatedWeb3 = new Web3(window.web3.currentProvider);
  await setDefaultAccount(instantiatedWeb3);
  return instantiatedWeb3;
}
