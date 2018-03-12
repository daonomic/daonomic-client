import { when } from 'mobx';
import api from '~/api/mock';
import { AuthStore } from '~/stores/auth';
import { SaleStore } from './';

jest.useFakeTimers();

describe('sale store', () => {
  const testSale = '0×0';

  test('should not load anything if not authenticated', () => {
    const auth = new AuthStore({ api });
    const sale = new SaleStore({
      api,
      auth,
      sale: testSale,
    });

    expect(auth.isAuthenticated).toBe(false);
    expect(sale.isLoading).toBe(false);
    expect(sale.isLoaded).toBe(false);
  });

  test('should load data immediately after authentication', (done) => {
    const auth = new AuthStore({ api });
    const sale = new SaleStore({
      api,
      auth,
      sale: testSale,
    });

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
