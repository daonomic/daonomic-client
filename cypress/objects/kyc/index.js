import { getMarkerSelector } from '../../support/get-marker-selector';

class Kyc {
  marker = getMarkerSelector('kyc');

  getReviewAnnotation() {
    return cy.get(this.marker('review-annotation')());
  }

  getDenialAnnotation() {
    return cy.get(this.marker('denial-annotation')());
  }
}

export const kycView = new Kyc();
