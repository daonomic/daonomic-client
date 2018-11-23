import { getMarkerSelector } from '../../support/get-marker-selector';

class ExtendedKycForm {
  marker = getMarkerSelector('extended-kyc-form');

  getRoot() {
    return cy.get(this.marker());
  }

  getSubmit() {
    return cy.get(this.marker('submit')());
  }

  getField({ name }) {
    return cy.get(`${this.marker()} [name="root_${name}"]`);
  }

  getCheckbox({ name }) {
    return cy.get(`${this.marker()} ${getMarkerSelector(`root_${name}`)()}`);
  }
}

export const extendedKycForm = new ExtendedKycForm();
