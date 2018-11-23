import { header } from '../../../objects/header';

Cypress.Commands.add('logout', () => {
  header.getLogoutButton().click();
});
