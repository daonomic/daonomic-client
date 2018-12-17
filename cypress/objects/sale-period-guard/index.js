import { getMarkerSelector } from '../../support/get-marker-selector';

class SalePeriodGuard {
  marker = getMarkerSelector('sale-period-guard');

  getRoot() {
    return cy.get(this.marker());
  }

  getCountdownTimer() {
    return cy.get(this.marker('countdown-timer')());
  }

  getFinishNotification() {
    return cy.get(this.marker('finish-notification')());
  }
}

export const salePeriodGuard = new SalePeriodGuard();
