// @flow
import { when, reaction } from 'mobx';
import { createMockApi } from '~/domains/app/api/mock';
import { freshAuthTokenProvider } from '~/stores/auth/token';
import { authProvider } from '~/stores/auth';
import { KycStore } from '~/modules/kyc/store';
import { paymentProvider } from './';

jest.useFakeTimers();

describe('payment store', () => {
  const testSale = '0×0';

  test('should not load anything if not authenticated', () => {
    const api = createMockApi();
    const auth = authProvider(api, freshAuthTokenProvider());
    const kyc = new KycStore();
    const payment = paymentProvider(api, auth, testSale, kyc);

    expect(auth.isAuthenticated).toBe(false);
    expect(payment.isLoading).toBe(false);
    expect(payment.isLoaded).toBe(false);
  });

  test('should load data immediately after authentication', async (done) => {
    const api = createMockApi();
    const auth = authProvider(api, freshAuthTokenProvider());
    const kyc = new KycStore();
    const payment = paymentProvider(api, auth, testSale, kyc);

    auth.setToken('test token');
    kyc.setState({
      dataState: 'loaded',
      data: { status: 'ALLOWED' },
    });
    expect(auth.isAuthenticated).toBe(true);
    expect(payment.isLoading).toBe(true);
    await when(() => payment.isLoaded);
    expect(payment.state.methods.length).toBe(3);
    expect(payment.state.selectedMethodId).toBe('ETH');
    expect(payment.state.methods.map((method) => method.id)).toEqual([
      'ETH',
      'BTC',
      'ERC20',
    ]);
    done();
  });

  test('should load payment address', async (done) => {
    const api = createMockApi();

    api.getSaleInfo.setResponse('successBtcFirst');

    const auth = authProvider(api, freshAuthTokenProvider());
    const kyc = new KycStore();
    const payment = paymentProvider(api, auth, testSale, kyc);

    auth.setToken('test token');
    kyc.setState({
      dataState: 'loaded',
      data: { status: 'ALLOWED' },
    });

    await when(
      () =>
        auth.isAuthenticated &&
        kyc.state.dataState === 'loaded' &&
        kyc.state.data.status === 'ALLOWED' &&
        payment.isLoaded &&
        payment.state.addressesByMethodId.size > 0 &&
        payment.state.selectedMethodAddressQRCode !== '',
    );

    expect(payment.state.selectedMethodId).toBe('BTC');
    expect(payment.selectedMethodAddress).toBe(
      'msWLqbLYmWr21neydLNWwLccTPjDTmmXbM',
    );
    expect(payment.state.selectedMethodAddressQRCode).toBe(
      'data:image/png;base64,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',
    );

    api.getSaleInfo.reset();
    done();
  });

  test('should update payments regularly', async (done) => {
    const api = createMockApi();

    api.getSaleInfo.setResponse('successBtcFirst');

    const auth = authProvider(api, freshAuthTokenProvider());
    const kyc = new KycStore();
    const payment = paymentProvider(api, auth, testSale, kyc);

    auth.setToken('test token');
    kyc.setState({
      dataState: 'loaded',
      data: { status: 'ALLOWED' },
    });

    let paymentsUpdateCount = 0;

    const dispose = reaction(
      () => payment.selectedMethodPayments.length,
      (paymentsCount) => {
        if (paymentsCount > 0) {
          paymentsUpdateCount += 1;

          if (paymentsUpdateCount < 3) {
            jest.runOnlyPendingTimers();
          } else {
            dispose();
            api.getSaleInfo.reset();
            done();
          }
        }
      },
    );
  });

  test('should reset loaded payment addresses and issue requests, and stop loading issue request status if user logs out', (done) => {
    const api = createMockApi();

    api.getSaleInfo.setResponse('successBtcFirst');

    const auth = authProvider(api, freshAuthTokenProvider());
    const kyc = new KycStore();
    const payment = paymentProvider(api, auth, testSale, kyc);

    auth.setToken('test token');
    kyc.setState({
      dataState: 'loaded',
      data: { status: 'ALLOWED' },
    });

    let paymentsUpdateCount = 0;

    reaction(
      () => payment.selectedMethodPayments.length,
      (paymentsCount) => {
        if (paymentsCount !== 0) {
          paymentsUpdateCount += 1;

          if (paymentsUpdateCount < 3) {
            jest.runOnlyPendingTimers();
          } else {
            auth.logout();
          }
        } else {
          expect(paymentsUpdateCount).toBe(3);
          expect(payment.state.addressesByMethodId.size).toBe(0);
          expect(payment.state.paymentsByMethodId.size).toBe(0);

          api.getSaleInfo.reset();
          done();
        }
      },
    );
  });
});
