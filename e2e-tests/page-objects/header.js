const PageObject = require('./page-object');
const getMarkerSelector = require('../utils/get-marker-selector');
const waitAndGetElement = require('../utils/wait-and-get-element');

class HeaderPage extends PageObject {
  get root() {
    return waitAndGetElement(this.marker());
  }

  get logoutButton() {
    return waitAndGetElement(this.marker('logout')());
  }
}

module.exports = new HeaderPage({
  marker: getMarkerSelector('header'),
});
