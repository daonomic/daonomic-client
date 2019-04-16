import { getMarkerSelector } from '../../../support/get-marker-selector';

class PaymentMethodModal {
  marker = getMarkerSelector('payment-modal');

  getRoot() {
    return cy.get(this.marker());
  }

  getContinue() {
    return cy.get(this.marker('continue')());
  }
}

export const paymentMethodModal = new PaymentMethodModal();
