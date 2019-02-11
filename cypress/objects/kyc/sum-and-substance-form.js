import { getMarkerSelector } from '../../support/get-marker-selector';

class SumAndSubstanceKycForm {
  marker = getMarkerSelector('sumsub-kyc-form');

  getRoot() {
    return cy.get(this.marker());
  }

  getIframe() {
    return cy.get(`${this.marker('iframe-target')()} iframe`);
  }

  getError() {
    return cy.get(this.marker('error')());
  }
}

export const sumAndSubstanceKycForm = new SumAndSubstanceKycForm();
