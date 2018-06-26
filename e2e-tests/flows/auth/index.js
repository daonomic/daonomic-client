const initApplication = require('../../utils/init-application');
const signInPage = require('../../page-objects/sign-in');
const appHeader = require('../../page-objects/header');

async function login({ getIco, email, password }) {
  await signInPage.open();
  await initApplication({ getIco });
  await signInPage.email.setValue(email);
  await signInPage.password.setValue(password);
  await signInPage.submitButton.click();
  await appHeader.root;
}

async function logout() {
  await appHeader.logoutButton.click();
}

module.exports = {
  login,
  logout,
};
