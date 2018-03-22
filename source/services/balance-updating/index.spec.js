import { when, reaction } from 'mobx';
import api from '~/api/mock';
import { authTokenProvider } from '~/stores/auth/token';
import { authProvider } from '~/stores/auth';
import { kycProvider } from '~/stores/kyc';
import { walletBalanceProvider } from '~/stores/wallet/balance';
import { balanceUpdatingService } from './';

describe('balance updating service', () => {
  test('should not load balance if wallet address is not saved yet', () => {
    const auth = authProvider(api, authTokenProvider());
    const kyc = kycProvider(api, auth);
    const walletBalance = walletBalanceProvider(api);

    balanceUpdatingService(auth, kyc, walletBalance);

    expect(kyc.isSaved).toBe(false);
    expect(walletBalance.isLoading).toBe(false);
  });

  test('should automatically load balance if wallet address has just been saved', (done) => {
    const auth = authProvider(api, authTokenProvider());
    const kyc = kycProvider(api, auth);
    const walletBalance = walletBalanceProvider(api);

    balanceUpdatingService(auth, kyc, walletBalance);

    expect(walletBalance.state.balance).toBe(0);

    kyc.updateFormField('address', 'test address');
    kyc.saveData();

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

    const auth = authProvider(api, authTokenProvider());
    const kyc = kycProvider(api, auth);
    const walletBalance = walletBalanceProvider(api);

    balanceUpdatingService(auth, kyc, walletBalance);

    kyc.updateFormField('address', 'test address');
    kyc.saveData();

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

  test('should cancel loading and reset balance if kyc is not allowed anymore', (done) => {
    jest.useFakeTimers();

    const auth = authProvider(api, authTokenProvider());
    const kyc = kycProvider(api, auth);
    const walletBalance = walletBalanceProvider(api);

    balanceUpdatingService(auth, kyc, walletBalance);

    kyc.updateFormField('address', 'test address');
    kyc.saveData();

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

    when(
      () => walletBalance.isLoaded && balanceUpdatesCount === 3,
      () => {
        kyc.reset();

        when(
          () => !walletBalance.isLoaded && walletBalance.state.balance === 0,
          () => {
            expect(balanceUpdatesCount).toBe(4);
            done();
          },
        );
      },
    );
  });

  test('should cancel loading and reset balance if user logs out', (done) => {
    jest.useFakeTimers();

    const auth = authProvider(api, authTokenProvider());

    auth.setToken('test token');

    const kyc = kycProvider(api, auth);
    const walletBalance = walletBalanceProvider(api);

    balanceUpdatingService(auth, kyc, walletBalance);

    kyc.updateFormField('address', 'test address');
    kyc.saveData();

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

    when(
      () => walletBalance.isLoaded && balanceUpdatesCount === 3,
      () => {
        auth.logout();

        when(
          () => !walletBalance.isLoaded && walletBalance.state.balance === 0,
          () => {
            expect(balanceUpdatesCount).toBe(4);
            done();
          },
        );
      },
    );
  });
});
