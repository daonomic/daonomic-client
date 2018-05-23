// @flow
import { fromPromise } from 'mobx-utils';
import promisifyEvent from 'p-event';
import pTimeout from 'p-timeout';

let loadedWeb3 = null;
let instantiatedWeb3 = null;

function loadWeb3() {
  if (!loadedWeb3) {
    loadedWeb3 = import(/* webpackChunkName: "web3" */ 'web3').then(
      (loadedModule) => loadedModule.default,
    );
  }

  return loadedWeb3;
}

async function initWeb3() {
  if (!instantiatedWeb3 && !window.web3) {
    throw new Error('Failed to find web3 provider');
  } else if (instantiatedWeb3) {
    return instantiatedWeb3;
  }

  const Web3 = await loadWeb3();

  instantiatedWeb3 = new Web3(window.web3.currentProvider);
  await setDefaultWeb3Account(instantiatedWeb3);
  return instantiatedWeb3;
}

async function setDefaultWeb3Account(web3) {
  const accounts = await web3.eth.getAccounts();

  web3.eth.defaultAccount = accounts[0];
}

export function getWeb3Instance() {
  const web3Promise =
    document.readyState === 'complete'
      ? initWeb3()
      : promisifyEvent(window, 'load').then(initWeb3);

  return fromPromise(pTimeout(web3Promise, 1000 * 20));
}

export function getWeb3InstanceProvider() {
  return getWeb3Instance;
}
