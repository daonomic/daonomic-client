// @flow
export async function setDefaultAccount(web3: any) {
  const accounts = await web3.eth.getAccounts();

  web3.eth.defaultAccount = accounts[0];
}
