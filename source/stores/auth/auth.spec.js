import { when } from 'mobx';
import mockedApi from '~/api/api.mock';
import { AuthStore } from './';

describe('auth store', () => {
  const testEmail = 'pupkin@yandex.ru';
  const testPassword = '12341234';
  const newPasswordToken = 'asdf';

  describe('setToken', () => {
    test('successful token set', () => {
      const authStore = new AuthStore({
        api: {},
      });

      expect(authStore.token).toBe(null);
      authStore.setToken('1234');
      expect(authStore.token).toBe('1234');
    });
  });

  describe('logout', () => {
    test('successful logout', () => {
      const authStore = new AuthStore({
        api: {},
      });

      authStore.setToken('123123');

      expect(authStore.isAuthenticated).toBe(true);
      authStore.logout();
      expect(authStore.isAuthenticated).toBe(false);
    });
  });

  describe('registration', () => {
    test('successful registration', (done) => {
      mockedApi.auth.register.setResponse('success');
      const authStore = new AuthStore({
        api: mockedApi,
      });

      authStore.register({ email: testEmail });
      expect(authStore.isLoading).toBe(true);

      when(
        () => authStore.isLoading === false && authStore.isRegistered === true,
        done,
      );
    });

    test('failed registration', (done) => {
      mockedApi.auth.register.setResponse('fail');
      const authStore = new AuthStore({
        api: mockedApi,
      });

      authStore.register({ email: testEmail });
      expect(authStore.isLoading).toBe(true);

      when(
        () => authStore.isLoading === false && authStore.isRegistered === false && authStore.errors.email !== '',
        done,
      );
    });
  });

  describe('login', () => {
    test('success login', (done) => {
      mockedApi.auth.login.setResponse('success');
      const authStore = new AuthStore({
        api: mockedApi,
      });

      authStore.login({ email: testEmail, password: testPassword });
      expect(authStore.isLoading).toBe(true);

      when(
        () => authStore.isLoading === false && authStore.isAuthenticated === true,
        done,
      );
    });

    test('fail login', (done) => {
      mockedApi.auth.login.setResponse('fail');
      const authStore = new AuthStore({
        api: mockedApi,
      });

      authStore.login({ email: testEmail, password: testPassword });
      expect(authStore.isLoading).toBe(true);

      when(
        () => authStore.isLoading === false && authStore.isAuthenticated === false && authStore.errors.email !== '',
        done,
      );
    });
  });

  describe('password reset', () => {
    test('successful password reset', (done) => {
      mockedApi.auth.resetPassword.setResponse('success');
      const authStore = new AuthStore({
        api: mockedApi,
      });

      authStore.resetPassword({ email: testEmail });
      expect(authStore.isLoading).toBe(true);

      when(
        () => authStore.isLoading === false && authStore.isPasswordReset === true,
        done,
      );
    });

    test('failed password reset', (done) => {
      mockedApi.auth.resetPassword.setResponse('fail');
      const authStore = new AuthStore({
        api: mockedApi,
      });

      authStore.resetPassword({ email: testEmail });
      expect(authStore.isLoading).toBe(true);

      when(
        () => authStore.isLoading === false && authStore.isPasswordReset === false,
        done,
      );
    });
  });

  describe('create new password', () => {
    test('successful a new password creating', (done) => {
      mockedApi.auth.createNewPassword.setResponse('success');
      const authStore = new AuthStore({
        api: mockedApi,
      });

      authStore.createNewPassword({ token: newPasswordToken, password: 1234, confirmedPassword: 1234 });
      expect(authStore.isLoading).toBe(true);

      when(
        () => authStore.isLoading === false && authStore.isNewPasswordCreated === true,
        done,
      );
    });

    test('failed a new password creating', (done) => {
      mockedApi.auth.createNewPassword.setResponse('fail');
      const authStore = new AuthStore({
        api: mockedApi,
      });

      authStore.createNewPassword({ token: newPasswordToken, password: 1234, confirmedPassword: 4322 });
      expect(authStore.isLoading).toBe(true);

      when(
        () => authStore.isLoading === false && authStore.isNewPasswordCreated === false && authStore.errors.confirmedPassword !== '',
        done,
      );
    });
  });
});
