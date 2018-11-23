import { getMarkerSelector } from '../support/get-marker-selector';

class PaymentMethod {
  marker = getMarkerSelector('payment-method');

  getRoot() {
    return cy.get(this.marker());
  }
}

export const paymentMethod = new PaymentMethod();
