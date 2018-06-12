const PageObject = require('../page-object');
const getMarkerSelector = require('../../utils/get-marker-selector');
const waitAndGetElement = require('../../utils/wait-and-get-element');

class ExchangeForm extends PageObject {
  get root() {
    return waitAndGetElement(this.marker());
  }

  get amount() {
    return waitAndGetElement(this.marker('amount')());
  }

  get cost() {
    return waitAndGetElement(this.marker('cost')());
  }

  get buy() {
    return waitAndGetElement(this.marker('buy')());
  }
}

module.exports = new ExchangeForm({
  marker: getMarkerSelector('exchange-form'),
});
