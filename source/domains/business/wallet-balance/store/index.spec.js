// @flow
import { WalletBalanceStore } from '.';
import * as WalletBalanceTypes from '~/domains/business/wallet-balance/types';

describe('wallet balance store', () => {
  let walletBalance = new WalletBalanceStore();

  beforeEach(() => {
    walletBalance = new WalletBalanceStore();
  });

  test('should not load balance by default', () => {
    expect(walletBalance.state.dataState).toBe('idle');
    expect(walletBalance.state.balance).toBe(0);
  });

  test('should automatically load balance if wallet address has just been saved', () => {
    expect(walletBalance.state.balance).toBe(0);

    walletBalance.setState({
      dataState: 'loading',
    });

    expect(walletBalance.isLoading).toBe(true);

    walletBalance.setState({
      dataState: 'loaded',
      balance: 50,
    });
    expect(walletBalance.isLoading).toBe(false);
    expect(walletBalance.isLoaded).toBe(true);
    expect(walletBalance.state.balance).toBe(50);
  });

  test('should calculate nearest unlock date', () => {
    const primaryEvent: WalletBalanceTypes.UnlockEvent = {
      date: Date.now() + 10000,
      amount: 1,
    };

    const locks: WalletBalanceTypes.Lock[] = [
      {
        address: 'test',
        balance: {
          total: 100,
          released: 50,
          vested: 20,
        },
        unlockEvents: [
          {
            date: Date.now() + 50000,
            amount: 1,
          },
          primaryEvent,
          {
            date: Date.now() + 60000,
            amount: 1,
          },
        ],
      },
      {
        address: 'test1',
        balance: {
          total: 100,
          released: 50,
          vested: 20,
        },
        unlockEvents: [
          {
            date: Date.now() + 80000,
            amount: 1,
          },
          {
            date: Date.now() + 90000,
            amount: 1,
          },
        ],
      },
    ];

    walletBalance.setState({
      locks,
    });

    expect(walletBalance.nextUnlockEvent).toEqual(primaryEvent);
  });
});
