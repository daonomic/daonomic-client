const PageObject = require('../page-object');
const getMarkerSelector = require('../../utils/get-marker-selector');
const waitAndGetElement = require('../../utils/wait-and-get-element');

class ExtendedKycForm extends PageObject {
  get root() {
    return waitAndGetElement(this.marker());
  }

  get submit() {
    return waitAndGetElement(this.marker('submit')());
  }

  getField({ name }) {
    return waitAndGetElement(`${this.marker()} [name="${name}"]`);
  }

  getCheckbox({ name }) {
    return waitAndGetElement(this.marker(name)());
  }
}

module.exports = new ExtendedKycForm({
  marker: getMarkerSelector('extended-kyc-form'),
});
