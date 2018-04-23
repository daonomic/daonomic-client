const PageObject = require('./page-object');
const getMarkerSelector = require('../utils/get-marker-selector');
const waitAndGetElement = require('../utils/wait-and-get-element');

class SignInPage extends PageObject {
  get form() {
    return waitAndGetElement(this.marker('form')());
  }

  get email() {
    return waitAndGetElement(this.marker('email')());
  }

  get password() {
    return waitAndGetElement(this.marker('password')());
  }

  get passwordResetLink() {
    return waitAndGetElement(this.marker('reset-password')());
  }

  get signUpLink() {
    return waitAndGetElement(this.marker('sign-up-link')());
  }

  get submitButton() {
    return waitAndGetElement(this.marker('submit')());
  }

  get error() {
    return waitAndGetElement(this.marker('error')());
  }
}

module.exports = new SignInPage({
  getUrl: () => '/#/sign/in',
  marker: getMarkerSelector('sign-in'),
});
