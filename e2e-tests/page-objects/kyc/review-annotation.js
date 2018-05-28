const PageObject = require('../page-object');
const getMarkerSelector = require('../../utils/get-marker-selector');
const waitAndGetElement = require('../../utils/wait-and-get-element');

class KycReviewAnnotation extends PageObject {
  get root() {
    return waitAndGetElement(this.marker());
  }
}

module.exports = new KycReviewAnnotation({
  marker: getMarkerSelector('kyc-review-annotation'),
});
