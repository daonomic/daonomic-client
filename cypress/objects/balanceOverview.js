import { getMarkerSelector } from '../support/get-marker-selector';

class BalanceOverview {
  marker = getMarkerSelector('balance-overview');

  getRoot() {
    return cy.get(this.marker());
  }

  getTotalReceived() {
    return cy.get(this.marker('total-received')());
  }

  getAvailable() {
    return cy.get(this.marker('available')());
  }

  getWithdrawButton() {
    return cy.get(this.marker('withdraw-button')());
  }

  getNextUnlockDate() {
    return cy.get(this.marker('next-unlock-date')());
  }

  getNextUnlockAmount() {
    return cy.get(this.marker('next-unlock-amount')());
  }

  getUnlocksTable() {
    return cy.get(this.marker('unlocks-table')());
  }

  getRefreshNotification() {
    return cy.get(this.marker('refresh-notification')());
  }

  getCountdown() {
    return cy.get(this.marker('countdown')());
  }

  getCountdownDays() {
    return cy.get(this.marker('countdown-days')());
  }
}

export const balanceOverview = new BalanceOverview();
