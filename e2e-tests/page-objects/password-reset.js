const PageObject = require('./page-object');
const getMarkerSelector = require('../utils/get-marker-selector');
const waitAndGetElement = require('../utils/wait-and-get-element');

class PasswordResetPage extends PageObject {
  get form() {
    return waitAndGetElement(this.marker('form')());
  }

  get email() {
    return waitAndGetElement(this.marker('email')());
  }

  get submitButton() {
    return waitAndGetElement(this.marker('submit')());
  }

  get successMessage() {
    return waitAndGetElement(this.marker('success-message')());
  }

  get error() {
    return waitAndGetElement(this.marker('error')());
  }
}

module.exports = new PasswordResetPage({
  getUrl: () => '/#/sign/reset-password',
  marker: getMarkerSelector('reset-password'),
});
