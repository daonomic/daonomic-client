import { getMarkerSelector } from '../support/get-marker-selector';

class Balance {
  marker = getMarkerSelector('balance');

  getRoot() {
    return cy.get(this.marker());
  }

  getAmount() {
    return cy.get(this.marker('amount')());
  }

  getLockedBalance() {
    return cy.get(this.marker('locked-balance')());
  }
}

export const balance = new Balance();
