import { when, reaction } from 'mobx';
import api from '~/api/mock';
import { authTokenProvider } from '~/stores/auth/token';
import { authProvider } from '~/stores/auth';
import { kycProvider } from '~/stores/kyc';
import { paymentProvider } from './';

jest.useFakeTimers();

describe('payment store', () => {
  const testSale = '0×0';

  test('should not load anything if not authenticated', () => {
    const auth = authProvider(api, authTokenProvider());
    const kyc = kycProvider(api, auth);
    const payment = paymentProvider(api, auth, testSale, kyc);

    expect(auth.isAuthenticated).toBe(false);
    expect(payment.isLoading).toBe(false);
    expect(payment.isLoaded).toBe(false);
  });

  test('should load data immediately after authentication', (done) => {
    const auth = authProvider(api, authTokenProvider());
    const kyc = kycProvider(api, auth);
    const payment = paymentProvider(api, auth, testSale, kyc);

    auth.setToken('test token');

    expect(auth.isAuthenticated).toBe(true);
    expect(payment.isLoading).toBe(true);

    when(
      () => payment.isLoaded,
      () => {
        expect(payment.methods.length).toBe(2);
        expect(payment.selectedMethodId).toBe('ETH');
        done();
      },
    );
  });

  test('should load payment address', (done) => {
    const auth = authProvider(api, authTokenProvider());
    const kyc = kycProvider(api, auth);
    const payment = paymentProvider(api, auth, testSale, kyc);

    api.getIcoInfo.setResponse('successBtcFirst');
    auth.setToken('test token');

    when(
      () =>
        auth.isAuthenticated &&
        kyc.isAllowed &&
        payment.isLoaded &&
        payment.addressesByMethodId.size > 0 &&
        payment.selectedMethodAddressQRCode !== null,
      () => {
        expect(payment.selectedMethodId).toBe('BTC');
        expect(payment.selectedMethodAddress).toBe(
          'msWLqbLYmWr21neydLNWwLccTPjDTmmXbM',
        );
        expect(payment.selectedMethodAddressQRCode).toBe(
          'data:image/png;base64,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',
        );

        api.getIcoInfo.reset();
        done();
      },
    );
  });

  test('should update payments regularly', (done) => {
    const auth = authProvider(api, authTokenProvider());
    const kyc = kycProvider(api, auth);
    const payment = paymentProvider(api, auth, testSale, kyc);

    api.getIcoInfo.setResponse('successBtcFirst');
    auth.setToken('test token');

    let paymentsUpdateCount = 0;

    reaction(
      () => payment.selectedMethodPayments.length,
      (paymentsCount) => {
        if (paymentsCount > 0 && paymentsUpdateCount < 3) {
          paymentsUpdateCount += 1;
          jest.runOnlyPendingTimers();
        }
      },
    );

    when(
      () => payment.selectedMethodPayments && paymentsUpdateCount === 3,
      () => {
        api.getIcoInfo.reset();
        done();
      },
    );
  });

  test('should reset loaded payment addresses and issue requests, and stop loading issue request status if kyc is not allowed anymore', (done) => {
    const auth = authProvider(api, authTokenProvider());
    const kyc = kycProvider(api, auth);
    const payment = paymentProvider(api, auth, testSale, kyc);

    api.getIcoInfo.setResponse('successBtcFirst');
    auth.setToken('test token');

    let paymentsUpdateCount = 0;

    reaction(
      () => payment.selectedMethodPayments.length,
      (paymentsCount) => {
        if (paymentsCount !== 0) {
          paymentsUpdateCount += 1;

          if (paymentsUpdateCount === 2) {
            kyc.reset();
          }

          jest.runOnlyPendingTimers();
        } else {
          expect(paymentsUpdateCount).toBe(2);
          expect(payment.addressesByMethodId.size).toBe(0);
          expect(payment.paymentsByMethodId.size).toBe(0);

          api.getIcoInfo.reset();
          done();
        }
      },
    );
  });

  test('should reset loaded payment addresses and issue requests, and stop loading issue request status if user logs out', (done) => {
    const auth = authProvider(api, authTokenProvider());
    const kyc = kycProvider(api, auth);
    const payment = paymentProvider(api, auth, testSale, kyc);

    api.getIcoInfo.setResponse('successBtcFirst');
    auth.setToken('test token');

    let paymentsUpdateCount = 0;

    reaction(
      () => payment.selectedMethodPayments.length,
      (paymentsCount) => {
        if (paymentsCount !== 0) {
          paymentsUpdateCount += 1;

          if (paymentsUpdateCount === 2) {
            auth.logout();
          }

          jest.runOnlyPendingTimers();
        } else {
          expect(paymentsUpdateCount).toBe(2);
          expect(payment.addressesByMethodId.size).toBe(0);
          expect(payment.paymentsByMethodId.size).toBe(0);

          api.getIcoInfo.reset();
          done();
        }
      },
    );
  });
});
