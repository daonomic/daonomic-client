import { getMarkerSelector } from '../support/get-marker-selector';

class PaymentMethod {
  marker = getMarkerSelector('payment-method');

  getRoot() {
    return cy.get(this.marker());
  }

  getSelect() {
    return cy.get(this.marker('select')());
  }

  getSelectOptions() {
    return cy.get(`${this.marker('select')()} option`);
  }
}

export const paymentMethod = new PaymentMethod();
