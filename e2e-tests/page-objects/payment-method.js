const getMarkerSelector = require('../utils/get-marker-selector');
const waitAndGetElement = require('../utils/wait-and-get-element');
const PageObject = require('./page-object');

class PaymentMethod extends PageObject {
  get root() {
    return waitAndGetElement(this.marker());
  }
}
module.exports = new PaymentMethod({
  marker: getMarkerSelector('payment-method'),
});
