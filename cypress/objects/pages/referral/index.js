import { getMarkerSelector } from '../../../support/get-marker-selector';
import { referralStatistics } from './statistics';
import { referralLink } from './link';

class ReferralPage {
  marker = getMarkerSelector('referral-page');

  get statistics() {
    return referralStatistics;
  }

  get link() {
    return referralLink;
  }

  getUrl = () => `/#/app/referral`;

  getRoot() {
    return cy.get(this.marker());
  }

  getReferrals() {
    return cy.get(this.marker('referrals')());
  }

  getRequiredKycNotification() {
    return cy.get(this.marker('required-kyc')());
  }

  getContent() {
    return cy.get(this.marker('content')());
  }
}

export const referralPage = new ReferralPage();
