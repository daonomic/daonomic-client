// @flow
let loadedWeb3 = null;

export function loadWeb3(): Promise<any> {
  if (!loadedWeb3) {
    loadedWeb3 = import(/* webpackChunkName: "web3" */ 'web3').then(
      (loadedModule) => loadedModule.default,
    );
  }

  return loadedWeb3;
}
