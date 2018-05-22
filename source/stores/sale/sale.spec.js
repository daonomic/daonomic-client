import { when } from 'mobx';
import api from '~/api/mock';
import { freshAuthTokenProvider } from '~/stores/auth/token';
import { authProvider } from '~/stores/auth';
import { saleProvider } from './';

jest.useFakeTimers();

describe('sale store', () => {
  const testSale = '0×0';

  test('should not load anything if not authenticated', () => {
    const auth = authProvider(api, freshAuthTokenProvider());
    const sale = saleProvider(api, auth, testSale);

    expect(auth.isAuthenticated).toBe(false);
    expect(sale.isLoading).toBe(false);
    expect(sale.isLoaded).toBe(false);
  });

  test('should load data immediately after authentication', async (done) => {
    const auth = authProvider(api, freshAuthTokenProvider());
    const sale = saleProvider(api, auth, testSale);

    auth.setToken('test token');

    expect(auth.isAuthenticated).toBe(true);
    expect(sale.isLoading).toBe(true);

    await when(() => sale.isLoaded);
    expect(sale.state.tokensCount.sold).toBe(10);
    expect(sale.state.tokensCount.total).toBe(20);
    expect(sale.isStarted).toBe(true);
    expect(sale.isFinished).toBe(false);
    done();
  });

  test('should reset loaded data when logged out', async (done) => {
    const auth = authProvider(api, freshAuthTokenProvider());
    const sale = saleProvider(api, auth, testSale);

    auth.setToken('test token');

    expect(auth.isAuthenticated).toBe(true);
    expect(sale.isLoading).toBe(true);

    await when(() => sale.isLoaded);
    expect(sale.state.tokensCount.sold).toBe(10);
    expect(sale.state.tokensCount.total).toBe(20);
    expect(sale.isStarted).toBe(true);
    expect(sale.isFinished).toBe(false);

    auth.logout();

    await when(() => !auth.isAuthenticated);
    expect(sale.isLoading).toBe(false);
    expect(sale.isLoaded).toBe(false);
    expect(sale.state.tokensCount.sold).toBe(0);
    expect(sale.state.tokensCount.total).toBe(0);
    done();
  });

  test('should consider sale as eternal if server returns no start and end timestamps', async (done) => {
    api.getIcoInfo.setResponse('successEternal');
    const auth = authProvider(api, freshAuthTokenProvider());
    const sale = saleProvider(api, auth, testSale);

    auth.setToken('test token');

    expect(auth.isAuthenticated).toBe(true);
    expect(sale.isLoading).toBe(true);

    await when(() => sale.isLoaded);
    expect(sale.isStarted).toBe(true);
    expect(sale.isFinished).toBe(false);
    expect(sale.state.startTimestamp).toBe(null);
    expect(sale.state.endTimestamp).toBe(null);

    api.getIcoInfo.reset();
    done();
  });
});
