// @flow
import { when, reaction } from 'mobx';
import { mockAuthApi } from '~/domains/business/auth/api/mock';
import { createFakeApiClient } from '~/domains/app/api-client/fake';
import { freshAuthTokenProvider } from '~/domains/business/auth/store/token';
import { AuthStore } from '~/domains/business/auth/store';
import { KycStore } from '~/domains/business/kyc/store';
import { walletBalance } from '~/domains/business/wallet-balance';
import { balanceUpdatingService } from '.';

describe('balance updating service', () => {
  let auth = new AuthStore({
    api: mockAuthApi,
    authToken: freshAuthTokenProvider(),
  });
  let kyc = new KycStore();

  beforeEach(() => {
    auth = new AuthStore({
      api: mockAuthApi,
      authToken: freshAuthTokenProvider(),
    });
    kyc = new KycStore();
  });

  test('should not load balance if wallet address is not saved yet', () => {
    const apiClient = createFakeApiClient({
      '/balance': {
        GET: () => ({ balance: 0 }),
      },
    });

    balanceUpdatingService.init(auth, kyc, walletBalance, apiClient);

    expect(walletBalance.isLoading).toBe(false);
  });

  test('should automatically load balance if kyc has just been approved', async (done) => {
    const apiClient = createFakeApiClient({
      '/balance': {
        GET: () => ({ balance: 5 }),
      },
    });

    balanceUpdatingService.init(auth, kyc, walletBalance, apiClient);
    expect(walletBalance.state.balance).toBe(0);

    kyc.setState({
      dataState: 'loaded',
      data: { status: 'ALLOWED' },
    });

    await when(() => kyc.isAllowed && walletBalance.isLoading);
    await when(() => walletBalance.isLoaded);
    expect(walletBalance.state.balance).toBeGreaterThan(0);
    done();
  });

  test('should update balance regularly', (done) => {
    jest.useFakeTimers();

    const apiClient = createFakeApiClient({
      '/balance': {
        GET: () => ({ balance: 5 }),
      },
    });

    balanceUpdatingService.init(auth, kyc, walletBalance, apiClient);
    kyc.setState({
      dataState: 'loaded',
      data: { status: 'ALLOWED' },
    });
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

  test('should cancel loading and reset balance if user logs out', async (done) => {
    jest.useFakeTimers();
    auth.setToken('test token');

    const apiClient = createFakeApiClient({
      '/balance': {
        GET: () => ({ balance: 5 }),
      },
    });

    balanceUpdatingService.init(auth, kyc, walletBalance, apiClient);
    kyc.setState({
      dataState: 'loaded',
      data: { status: 'ALLOWED' },
    });
    let balanceUpdatesCount = 0;

    const dispose = reaction(
      () => walletBalance.isLoaded,
      (isLoaded) => {
        if (isLoaded) {
          balanceUpdatesCount += 1;

          if (balanceUpdatesCount < 3) {
            jest.runOnlyPendingTimers();
          } else {
            auth.logout();
            dispose();
          }
        }
      },
    );

    await when(() => !auth.isAuthenticated);
    expect(walletBalance.isLoaded).toBe(false);
    expect(walletBalance.state.balance).toBe(0);
    expect(balanceUpdatesCount).toBe(3);
    done();
  });
});
