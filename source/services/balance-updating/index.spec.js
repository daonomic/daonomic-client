import { when, reaction } from 'mobx';
import api from '~/api/mock';
import { freshAuthTokenProvider } from '~/stores/auth/token';
import { authProvider } from '~/stores/auth';
import { kycProvider } from '~/stores/kyc';
import { walletBalanceProvider } from '~/stores/wallet/balance';
import { balanceUpdatingService } from './';

const getWeb3Instance = () => Promise.reject();

describe('balance updating service', () => {
  test('should not load balance if wallet address is not saved yet', () => {
    const auth = authProvider(api, freshAuthTokenProvider());
    const kyc = kycProvider(api, auth, getWeb3Instance);
    const walletBalance = walletBalanceProvider(api);

    balanceUpdatingService(auth, kyc, walletBalance);

    expect(walletBalance.isLoading).toBe(false);
  });

  test('should automatically load balance if kyc has just been approved', (done) => {
    const auth = authProvider(api, freshAuthTokenProvider());
    const kyc = kycProvider(api, auth, getWeb3Instance);
    const walletBalance = walletBalanceProvider(api);

    balanceUpdatingService(auth, kyc, walletBalance);
    expect(walletBalance.state.balance).toBe(0);
    kyc.saveData(new Map());

    when(
      () => kyc.isAllowed && walletBalance.isLoading,
      () => {
        when(
          () => walletBalance.isLoaded,
          () => {
            expect(walletBalance.state.balance).toBeGreaterThan(0);
            done();
          },
        );
      },
    );
  });

  test('should update balance regularly', (done) => {
    jest.useFakeTimers();

    const auth = authProvider(api, freshAuthTokenProvider());
    const kyc = kycProvider(api, auth, getWeb3Instance);
    const walletBalance = walletBalanceProvider(api);

    balanceUpdatingService(auth, kyc, walletBalance);
    kyc.saveData(new Map());
    let balanceUpdatesCount = 0;

    reaction(
      () => walletBalance.isLoaded,
      (isLoaded) => {
        if (isLoaded && balanceUpdatesCount < 3) {
          balanceUpdatesCount += 1;
          jest.runOnlyPendingTimers();
        }
      },
    );

    when(() => walletBalance.isLoaded && balanceUpdatesCount === 3, done);
  });

  test('should cancel loading and reset balance if kyc is not allowed anymore', async (done) => {
    jest.useFakeTimers();

    const auth = authProvider(api, freshAuthTokenProvider());
    const kyc = kycProvider(api, auth, getWeb3Instance);
    const walletBalance = walletBalanceProvider(api);

    balanceUpdatingService(auth, kyc, walletBalance);
    kyc.saveData(new Map());
    let balanceUpdatesCount = 0;

    reaction(
      () => walletBalance.isLoaded,
      (isLoaded) => {
        if (isLoaded) {
          balanceUpdatesCount += 1;
          jest.runOnlyPendingTimers();
        }
      },
    );

    await when(() => walletBalance.isLoaded && balanceUpdatesCount === 3);
    kyc.reset();
    expect(balanceUpdatesCount).toBe(4);
    done();
  });

  test('should cancel loading and reset balance if user logs out', async (done) => {
    jest.useFakeTimers();

    const auth = authProvider(api, freshAuthTokenProvider());

    auth.setToken('test token');

    const kyc = kycProvider(api, auth, getWeb3Instance);
    const walletBalance = walletBalanceProvider(api);

    balanceUpdatingService(auth, kyc, walletBalance);
    kyc.saveData(new Map());
    let balanceUpdatesCount = 0;

    reaction(
      () => walletBalance.isLoaded,
      (isLoaded) => {
        if (isLoaded) {
          balanceUpdatesCount += 1;
          jest.runOnlyPendingTimers();
        }
      },
    );

    await when(() => walletBalance.isLoaded && balanceUpdatesCount === 3);
    auth.logout();

    when(
      () => !walletBalance.isLoaded && walletBalance.state.balance === 0,
      () => {
        expect(balanceUpdatesCount).toBe(4);
        done();
      },
    );
  });
});
