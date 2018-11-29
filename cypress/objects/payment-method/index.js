import { getMarkerSelector } from '../../support/get-marker-selector';
import { paymentMethodAddress } from './address';
import { exchangeForm } from './exchange-form';

class PaymentMethod {
  marker = getMarkerSelector('payment-method');

  get address() {
    return paymentMethodAddress;
  }

  get exchangeForm() {
    return exchangeForm;
  }

  getRoot() {
    return cy.get(this.marker());
  }

  getSelect() {
    return cy.get(this.marker('select')());
  }

  getSelectOptions() {
    return cy.get(`${this.marker('select')()} option`);
  }

  getInstruction() {
    return cy.get(this.marker('instruction')());
  }
}

export const paymentMethod = new PaymentMethod();
