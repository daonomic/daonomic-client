import { when } from 'mobx';
import mockedApi from '~/api/mock';
import { authTokenProvider } from './token';
import { authProvider } from './';

describe('auth store', () => {
  const testEmail = 'pupkin@yandex.ru';
  const testPassword = '12341234';
  const newPasswordToken = 'asdf';

  describe('setToken', () => {
    test('successful token set', () => {
      const authStore = authProvider({}, authTokenProvider());

      expect(authStore.token.value).toBe(null);
      authStore.setToken('1234');
      expect(authStore.token.value).toBe('1234');
    });
  });

  describe('logout', () => {
    test('successful logout', () => {
      const authStore = authProvider({}, authTokenProvider());

      authStore.setToken('123123');

      expect(authStore.isAuthenticated).toBe(true);
      authStore.logout();
      expect(authStore.isAuthenticated).toBe(false);
    });
  });

  describe('registration', () => {
    test('successful registration', async (done) => {
      mockedApi.auth.register.setResponse('success');
      const authStore = authProvider(mockedApi, authTokenProvider());

      await authStore.register({ email: testEmail });
      done();
    });

    test('failed registration', async (done) => {
      mockedApi.auth.register.setResponse('fail');
      const authStore = authProvider(mockedApi, authTokenProvider());

      try {
        await authStore.register({ email: testEmail });
      } catch (error) {
        expect(error.response.data.fieldErrors.email.length).toBeGreaterThan(0);
        done();
      }
    });
  });

  describe('login', () => {
    test('successful login', async (done) => {
      mockedApi.auth.login.setResponse('success');
      const authStore = authProvider(mockedApi, authTokenProvider());

      await authStore.login({ email: testEmail, password: testPassword });
      expect(authStore.isAuthenticated).toBe(true);
      expect(authStore.id).toBe(1);
      done();
    });

    test('failed login', async (done) => {
      mockedApi.auth.login.setResponse('fail');
      const authStore = new authProvider(mockedApi, authTokenProvider());

      try {
        await authStore.login({ email: testEmail, password: testPassword });
      } catch (error) {
        expect(error.response.data.fieldErrors.email.length).toBeGreaterThan(0);
        done();
      }
    });
  });

  describe('password reset', () => {
    test('successful password reset', async (done) => {
      mockedApi.auth.resetPassword.setResponse('success');
      const authStore = authProvider(mockedApi, authTokenProvider());

      await authStore.resetPassword({ email: testEmail });
      done();
    });

    test('failed password reset', async (done) => {
      mockedApi.auth.resetPassword.setResponse('fail');
      const authStore = authProvider(mockedApi, authTokenProvider());

      try {
        await authStore.resetPassword({ email: testEmail });
      } catch (error) {
        expect(error.response.data.fieldErrors.email.length).toBeGreaterThan(0);
        done();
      }
    });
  });

  describe('create new password', () => {
    test('successful a new password creating', (done) => {
      mockedApi.auth.createNewPassword.setResponse('success');
      const authStore = authProvider(mockedApi, authTokenProvider());

      authStore.createNewPassword({
        token: newPasswordToken,
        password: 1234,
        confirmationPassword: 1234,
      });
      expect(authStore.isLoading).toBe(true);

      when(
        () =>
          authStore.isLoading === false &&
          authStore.isNewPasswordCreated === true,
        done,
      );
    });

    test('failed a new password creating', (done) => {
      mockedApi.auth.createNewPassword.setResponse('fail');
      const authStore = authProvider(mockedApi, authTokenProvider());

      authStore.createNewPassword({
        token: newPasswordToken,
        password: 1234,
        confirmationPassword: 4322,
      });
      expect(authStore.isLoading).toBe(true);

      when(
        () =>
          authStore.isLoading === false &&
          authStore.isNewPasswordCreated === false &&
          authStore.errors.confirmationPassword !== '',
        done,
      );
    });
  });
});
