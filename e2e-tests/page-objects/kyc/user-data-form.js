const PageObject = require('../page-object');
const getMarkerSelector = require('../../utils/get-marker-selector');
const waitAndGetElement = require('../../utils/wait-and-get-element');

class UserWalletAddressForm extends PageObject {
  get root() {
    return waitAndGetElement(this.marker());
  }

  get address() {
    return waitAndGetElement(this.marker('address')());
  }

  get confirmationAddress() {
    return waitAndGetElement(this.marker('confirmation-address')());
  }

  get residency() {
    return browser
      .waitForEnabled(this.marker('residency')())
      .then(() => waitAndGetElement(this.marker('residency')()));
  }

  get submit() {
    return waitAndGetElement(this.marker('submit')());
  }
}

module.exports = new UserWalletAddressForm({
  marker: getMarkerSelector('user-wallet-address-form'),
});
