const PageObject = require('./page-object');
const getMarkerSelector = require('../utils/get-marker-selector');
const waitAndGetElement = require('../utils/wait-and-get-element');

class Balance extends PageObject {
  get root() {
    return waitAndGetElement(this.marker());
  }

  get amount() {
    return waitAndGetElement(this.marker('amount')());
  }
}

module.exports = new Balance({
  marker: getMarkerSelector('balance'),
});
