import { getMarkerSelector } from '../../support/get-marker-selector';

class ExternalKyc {
  marker = getMarkerSelector('external-kyc');

  getRoot() {
    return cy.get(this.marker());
  }

  getLink() {
    return cy.get(this.marker('link')());
  }
}

export const externalKyc = new ExternalKyc();
