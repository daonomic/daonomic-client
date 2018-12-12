// @flow
import { fromPromise } from 'mobx-utils';
import promisifyEvent from 'p-event';
import pTimeout from 'p-timeout';
import { initWeb3 } from './init';
import { setDefaultAccount } from './set-default-account';

let web3Promise;

export async function getWeb3Instance() {
  if (!web3Promise) {
    web3Promise =
      document.readyState === 'complete'
        ? initWeb3()
        : promisifyEvent(window, 'load').then(initWeb3);
  }

  const web3 = await fromPromise(pTimeout(web3Promise, 1000 * 20));

  await setDefaultAccount(web3);
  return web3;
}
