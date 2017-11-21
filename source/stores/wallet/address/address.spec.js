import { when } from 'mobx';
import mockedApi from '~/api/api.mock';
import { AuthStore } from '~/stores/auth/auth';
import { WalletAddressStore } from './address';

describe('wallet store', () => {
  describe('not authenticated', () => {
    const auth = new AuthStore({ api: mockedApi });
    const walletAddress = new WalletAddressStore({ auth, api: mockedApi });

    test('should not be authenticated', () => {
      expect(auth.isAuthenticated).toBe(false);
    });

    test('should not load address initially', () => {
      expect(walletAddress.isLoading).toBe(false);
      expect(walletAddress.isLoaded).toBe(false);
    });

    test('should not save address initially', () => {
      expect(walletAddress.isSaving).toBe(false);
      expect(walletAddress.isSaved).toBe(false);
    });
  });

  describe('authenticated', () => {
    const testAddress = '12345';
    const auth = new AuthStore({ api: mockedApi });

    test('should automatically start loading saved address', () => {
      const walletAddress = new WalletAddressStore({ auth, api: mockedApi });

      expect(auth.isAuthenticated).toBe(false);
      expect(walletAddress.isLoading).toBe(false);

      auth.setToken('testToken');

      expect(auth.isAuthenticated).toBe(true);
      expect(walletAddress.isLoading).toBe(true);
    });

    test('successful address load', (done) => {
      const walletAddress = new WalletAddressStore({ auth, api: mockedApi });

      auth.setToken('testToken');
      expect(walletAddress.isLoading).toBe(true);

      when(
        () => walletAddress.isLoading === false && walletAddress.isLoaded === true,
        () => {
          expect(walletAddress.address).toBe('12345');
          done();
        },
      );
    });

    test('failed address load', (done) => {
      mockedApi.address.get.setResponse('fail');
      const walletAddress = new WalletAddressStore({ auth, api: mockedApi });

      auth.setToken('testToken');
      expect(walletAddress.isLoading).toBe(true);

      when(
        () => walletAddress.isLoaded,
        () => {
          expect(walletAddress.address).toBe('');
          mockedApi.address.get.reset();
          done();
        },
      );
    });

    test('should logout on failed address load with 403', (done) => {
      mockedApi.address.get.setResponse('failNotAuthorized');
      const walletAddress = new WalletAddressStore({ auth, api: mockedApi });

      auth.setToken('testToken');
      expect(walletAddress.isLoading).toBe(true);

      when(
        () => !walletAddress.isLoading,
        () => {
          expect(walletAddress.isLoaded).toBe(false);
          expect(walletAddress.address).toBe('');

          when(
            () => !auth.isAuthenticated,
            () => {
              mockedApi.address.get.reset();
              done();
            },
          );
        },
      );
    });

    test('setting custom address after successful address load', (done) => {
      const walletAddress = new WalletAddressStore({ auth, api: mockedApi });

      auth.setToken('testToken');

      when(
        () => walletAddress.isLoaded && walletAddress.address === testAddress,
        () => {
          walletAddress.setAddress('test');

          expect(walletAddress.isLoading).toBe(false);
          expect(walletAddress.isLoaded).toBe(false);
          expect(walletAddress.address).toBe('test');
          done();
        },
      );
    });

    test('successful custom address save', (done) => {
      const walletAddress = new WalletAddressStore({ auth, api: mockedApi });

      auth.setToken('testToken');

      when(
        () => walletAddress.isLoaded && walletAddress.address === testAddress,
        () => {
          walletAddress.setAddress('test');
          walletAddress.saveAddress();

          when(
            () => walletAddress.address === 'test' && walletAddress.isSaved,
            done,
          );
        },
      );
    });

    test('failed custom address save', (done) => {
      mockedApi.address.set.setResponse('fail');
      const walletAddress = new WalletAddressStore({ auth, api: mockedApi });

      auth.setToken('testToken');

      when(
        () => walletAddress.isLoaded && walletAddress.address === testAddress,
        () => {
          walletAddress.setAddress('test');
          walletAddress.saveAddress();

          when(
            () => walletAddress.error !== '',
            () => {
              mockedApi.address.set.reset();
              done();
            },
          );
        },
      );
    });

    test('should reset address if user logs out', (done) => {
      const walletAddress = new WalletAddressStore({ auth, api: mockedApi });

      auth.setToken('testToken');
      expect(walletAddress.isLoading).toBe(true);

      when(
        () => walletAddress.isLoading === false && walletAddress.isLoaded === true,
        () => {
          expect(walletAddress.address).toBe(testAddress);
          auth.logout();

          when(
            () => !auth.isAuthenticated,
            () => {
              expect(walletAddress.address).toBe('');
              expect(walletAddress.isLoading).toBe(false);
              expect(walletAddress.isLoaded).toBe(false);
              done();
            },
          );
        },
      );
    });
  });
});
