const PageObject = require('./page-object');
const getMarkerSelector = require('../utils/get-marker-selector');
const waitAndGetElement = require('../utils/wait-and-get-element');

class SignUpPage extends PageObject {
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

  get signInLink() {
    return waitAndGetElement(this.marker('sign-in-link')());
  }
}

module.exports = new SignUpPage({
  getUrl: () => '/#/sign/up',
  marker: getMarkerSelector('sign-up'),
});
