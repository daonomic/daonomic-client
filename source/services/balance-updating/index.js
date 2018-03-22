import { autorun } from 'mobx';

export function balanceUpdatingService(auth, kyc, walletBalance) {
  let balanceUpdateIntervalId = null;

  autorun(() => {
    if (balanceUpdateIntervalId) {
      clearInterval(balanceUpdateIntervalId);
    }

    if (kyc.isAllowed) {
      walletBalance.loadBalance();
      balanceUpdateIntervalId = setInterval(() => {
        walletBalance.loadBalance();
      }, 3000);
    } else {
      walletBalance.state.reset();
    }
  });
}
