import { when } from 'mobx';
import api from '~/api/mock';
import { authTokenProvider } from '~/stores/auth/token';
import { authProvider } from '~/stores/auth';
import { saleProvider } from './';

jest.useFakeTimers();

describe('sale store', () => {
  const testSale = '0×0';

  test('should not load anything if not authenticated', () => {
    const auth = authProvider(api, authTokenProvider());
    const sale = saleProvider(api, auth, testSale);

    expect(auth.isAuthenticated).toBe(false);
    expect(sale.isLoading).toBe(false);
    expect(sale.isLoaded).toBe(false);
  });

  test('should load data immediately after authentication', (done) => {
    const auth = authProvider(api, authTokenProvider());
    const sale = saleProvider(api, auth, testSale);

    auth.setToken('test token');

    expect(auth.isAuthenticated).toBe(true);
    expect(sale.isLoading).toBe(true);

    when(
      () => sale.isLoaded,
      () => {
        expect(sale.tokensCount.sold).toBe(10);
        expect(sale.tokensCount.total).toBe(20);
        expect(sale.isStarted).toBe(true);
        expect(sale.isFinished).toBe(false);
        expect();
        done();
      },
    );
  });
});
