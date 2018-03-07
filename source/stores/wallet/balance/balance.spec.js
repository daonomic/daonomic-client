import { when, reaction } from 'mobx';
import api from '~/api/api.mock';
import { AuthStore } from '~/stores/auth';
import { KycStore } from '~/stores/kyc';
import { WalletBalanceStore } from './';

describe('wallet balance store', () => {
  test('should not load balance if wallet address is not saved yet', () => {
    const auth = new AuthStore({ api });
    const kyc = new KycStore({ api, auth });
    const walletBalance = new WalletBalanceStore({ api, kyc });

    expect(kyc.isSaved).toBe(false);
    expect(walletBalance.isLoading).toBe(false);
  });

  test('should automatically load balance if wallet address has just been saved', (done) => {
    const auth = new AuthStore({ api });
    const kyc = new KycStore({ api, auth });
    const walletBalance = new WalletBalanceStore({ api, kyc });

    expect(walletBalance.balance).toBe(0);

    kyc.updateFormField('address', 'test address');
    kyc.saveData();

    when(
      () => kyc.isAllowed && walletBalance.isLoading,
      () => {
        when(
          () => walletBalance.isLoaded,
          () => {
            expect(walletBalance.balance).toBeGreaterThan(0);
            done();
          },
        );
      },
    );
  });

  test('should update balance regularly', (done) => {
    jest.useFakeTimers();

    const auth = new AuthStore({ api });
    const kyc = new KycStore({ api, auth });
    const walletBalance = new WalletBalanceStore({ api, kyc });

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

  test('should cancel loading and reset balance if saved kyc address has been reset', (done) => {
    jest.useFakeTimers();

    const auth = new AuthStore({ api });
    const kyc = new KycStore({ api, auth });
    const walletBalance = new WalletBalanceStore({ api, kyc });

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
        kyc.updateFormField('address', '');

        when(
          () => !walletBalance.isLoaded && walletBalance.balance === 0,
          () => {
            expect(balanceUpdatesCount).toBe(4);
            done();
          },
        );
      },
    );
  });
});
