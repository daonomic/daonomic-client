import { getMarkerSelector } from '../../support/get-marker-selector';

class UserDataForm {
  marker = getMarkerSelector('user-wallet-address-form');

  getRoot() {
    return cy.get(this.marker());
  }

  getAddress() {
    return cy.get(this.marker('address')());
  }

  getConfirmationAddress() {
    return cy.get(this.marker('confirmation-address')());
  }

  getResidency() {
    return cy.get(this.marker('residency')());
  }

  getSubmit() {
    return cy.get(this.marker('submit')());
  }
}

export const userDataForm = new UserDataForm();
