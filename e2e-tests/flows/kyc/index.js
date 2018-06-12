const userWalletAddressForm = require('../../page-objects/kyc/user-wallet-address-form');
const paymentMethod = require('../../page-objects/payment-method');

async function fillSimpleKyc({ address }) {
  await userWalletAddressForm.root;
  await userWalletAddressForm.address.setValue(address);
  await userWalletAddressForm.confirmationAddress.setValue(address);
  await userWalletAddressForm.submit.click();
  await paymentMethod.root;
}

module.exports = {
  fillSimpleKyc,
};
