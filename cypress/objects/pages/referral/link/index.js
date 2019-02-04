import { getMarkerSelector } from '../../../../support/get-marker-selector';

class ReferralLink {
  marker = getMarkerSelector('referral-link');

  getRoot() {
    return cy.get(this.marker());
  }
}

export const referralLink = new ReferralLink();
