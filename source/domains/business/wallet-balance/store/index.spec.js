// @flow
import { WalletBalanceStore } from '.';

describe('wallet balance store', () => {
  let walletBalance = new WalletBalanceStore();

  beforeEach(() => {
    walletBalance = new WalletBalanceStore();
  });

  test('should not load balance by default', () => {
    expect(walletBalance.state.balanceState).toBe('idle');
    expect(walletBalance.state.balance).toBe(0);
  });

  test('should automatically load balance if wallet address has just been saved', () => {
    expect(walletBalance.state.balance).toBe(0);

    walletBalance.setState({
      balanceState: 'loading',
    });

    expect(walletBalance.isLoading).toBe(true);

    walletBalance.setState({
      balanceState: 'loaded',
      balance: 50,
    });
    expect(walletBalance.isLoading).toBe(false);
    expect(walletBalance.isLoaded).toBe(true);
    expect(walletBalance.state.balance).toBe(50);
  });
});
