import { getMarkerSelector } from '../../support/get-marker-selector';

class KycReviewAnnotation {
  marker = getMarkerSelector('kyc-review-annotation');

  getRoot() {
    return cy.get(this.marker());
  }
}

export const kycReviewAnnotation = new KycReviewAnnotation();
