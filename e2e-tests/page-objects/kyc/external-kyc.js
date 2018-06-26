const PageObject = require('../page-object');
const getMarkerSelector = require('../../utils/get-marker-selector');
const waitAndGetElement = require('../../utils/wait-and-get-element');

class ExternalKyc extends PageObject {
  get root() {
    return waitAndGetElement(this.marker());
  }

  get link() {
    return waitAndGetElement(this.marker('link')());
  }
}

module.exports = new ExternalKyc({
  marker: getMarkerSelector('external-kyc'),
});
