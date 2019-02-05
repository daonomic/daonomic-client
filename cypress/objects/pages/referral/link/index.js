import { getMarkerSelector } from '../../../../support/get-marker-selector';

class ReferralLink {
  marker = getMarkerSelector('referral-link');

  getRoot() {
    return cy.get(this.marker());
  }

  getInput() {
    return cy.get(this.marker('input')());
  }
}

export const referralLink = new ReferralLink();
