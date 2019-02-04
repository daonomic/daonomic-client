import { getMarkerSelector } from '../../../../support/get-marker-selector';

class ReferralStatistics {
  marker = getMarkerSelector('referral-statistics');

  getRoot() {
    return cy.get(this.marker());
  }

  getUsers() {
    return cy.get(this.marker('users')());
  }

  getSold() {
    return cy.get(this.marker('sold')());
  }

  getBonus() {
    return cy.get(this.marker('bonus')());
  }
}

export const referralStatistics = new ReferralStatistics();
