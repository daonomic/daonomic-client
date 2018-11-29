import { getMarkerSelector } from '../../../support/get-marker-selector';

class PaymentMethodAddress {
  marker = getMarkerSelector('payment-method-address');

  getRoot() {
    return cy.get(this.marker());
  }

  getQrCode() {
    return cy.get(this.marker('qr')());
  }
}

export const paymentMethodAddress = new PaymentMethodAddress();
