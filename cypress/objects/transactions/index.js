import { getMarkerSelector } from '../../support/get-marker-selector';

class Transactions {
  marker = getMarkerSelector('transactions');

  getRoot() {
    return cy.get(this.marker());
  }

  getTableEntries() {
    return cy.get(`${this.marker('table')()} tbody tr`);
  }
}

export const transactions = new Transactions();
