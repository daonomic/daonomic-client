const PageObject = require('./page-object');
const getMarkerSelector = require('../utils/get-marker-selector');
const waitAndGetElement = require('../utils/wait-and-get-element');

class CreateNewPasswordPage extends PageObject {
  get form() {
    return waitAndGetElement(this.marker('form')());
  }

  get password() {
    return waitAndGetElement(this.marker('password')());
  }

  get password2() {
    return waitAndGetElement(this.marker('password2')());
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

module.exports = new CreateNewPasswordPage({
  getUrl: ({ token }) => `/#/sign/create-new-password/${token}`,
  marker: getMarkerSelector('create-new-password'),
});
