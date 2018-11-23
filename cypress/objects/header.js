import { getMarkerSelector } from '../support/get-marker-selector';

class Header {
  marker = getMarkerSelector('header');

  getRoot() {
    return cy.get(this.marker());
  }

  getLogoutButton() {
    return cy.get(this.marker('logout')());
  }
}

export const header = new Header();
