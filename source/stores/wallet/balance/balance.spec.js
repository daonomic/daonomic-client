import { when } from 'mobx';
import api from '~/domains/app/api/mock';
import { walletBalanceProvider } from './';

describe('wallet balance store', () => {
  test('should not load balance by default', () => {
    const walletBalance = walletBalanceProvider(api);

    expect(walletBalance.isLoading).toBe(false);
  });

  test('should automatically load balance if wallet address has just been saved', async (done) => {
    const walletBalance = walletBalanceProvider(api);

    expect(walletBalance.state.balance).toBe(0);
    walletBalance.loadBalance();
    await when(() => walletBalance.isLoading);
    await when(() => walletBalance.isLoaded);
    expect(walletBalance.state.balance).toBeGreaterThan(0);
    done();
  });
});
