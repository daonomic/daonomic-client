import { getMarkerSelector } from '../../support/get-marker-selector';

class TokenPrice {
  marker = getMarkerSelector('token-price');

  getRoot() {
    return cy.get(this.marker());
  }
}

export const tokenPrice = new TokenPrice();
