const userDataForm = require('../../page-objects/kyc/user-data-form');

async function fillUserData({ address }) {
  await userDataForm.root;

  const prefilledAddress = await userDataForm.address.getValue();

  if (prefilledAddress) {
    await userDataForm.confirmationAddress.setValue(prefilledAddress);
  } else {
    await userDataForm.address.setValue(address);
    await userDataForm.confirmationAddress.setValue(address);
  }

  await userDataForm.residency.selectByIndex(1);
  await userDataForm.submit.click();
}

module.exports = {
  fillUserData,
};
