import { getMarkerSelector } from '../../support/get-marker-selector';

class Navigation {
  marker = getMarkerSelector('navigation');

  getRoot() {
    return cy.get(this.marker());
  }

  getBuyTokensLink() {
    return cy.get(this.marker('buy-tokens')());
  }

  getCreateWalletLink() {
    return cy.get(this.marker('create-wallet')());
  }

  getReferralLink() {
    return cy.get(this.marker('referral')());
  }

  getFaqLink() {
    return cy.get(this.marker('faq')());
  }
}

export const navigation = new Navigation();
