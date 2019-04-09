export const isWeb3Installed = () => {
  return window ? typeof window.web3 !== 'undefined' : false;
};
