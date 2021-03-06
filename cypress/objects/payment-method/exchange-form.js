import { getMarkerSelector } from '../../support/get-marker-selector';

class ExchangeForm {
  marker = getMarkerSelector('exchange-form');

  getRoot() {
    return cy.get(this.marker());
  }

  getAmount() {
    return cy.get(this.marker('amount')());
  }

  getCost() {
    return cy.get(this.marker('cost')());
  }

  getBuy() {
    return cy.get(this.marker('buy')());
  }

  getKyberNetworkCheckbox() {
    return cy.get(this.marker('kyber-network-checkbox')());
  }
}

export const exchangeForm = new ExchangeForm();
