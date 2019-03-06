import { mockAuthApi } from '~/domains/business/auth/api/mock';
import { freshAuthTokenProvider } from './token';
import { AuthStore } from '.';

describe('auth store', () => {
  const testEmail = 'pupkin@yandex.ru';
  const testPassword = '12341234';
  const newPasswordToken = 'asdf';
  let authStore = new AuthStore({
    api: mockAuthApi,
    authToken: freshAuthTokenProvider(),
  });

  beforeEach(() => {
    authStore = new AuthStore({
      api: mockAuthApi,
      authToken: freshAuthTokenProvider(),
    });
  });

  describe('setToken', () => {
    test('successful token set', () => {
      expect(authStore.token.value).toBe(null);
      authStore.setToken('1234');
      expect(authStore.token.value).toBe('1234');
    });
  });

  describe('logout', () => {
    test('successful logout', () => {
      authStore.setToken('123123');

      expect(authStore.isAuthenticated).toBe(true);
      authStore.logout();
      expect(authStore.isAuthenticated).toBe(false);
    });
  });

  describe('registration', () => {
    test('successful registration', async (done) => {
      mockAuthApi.register.setResponse('success');

      await authStore.register({ email: testEmail });
      done();
    });

    test('failed registration', async (done) => {
      mockAuthApi.register.setResponse('fail');

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
      mockAuthApi.login.setResponse('success');

      await authStore.login({ email: testEmail, password: testPassword });
      expect(authStore.isAuthenticated).toBe(true);
      expect(authStore.id).toBe(1);
      done();
    });

    test('failed login', async (done) => {
      mockAuthApi.login.setResponse('fail');

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
      mockAuthApi.resetPassword.setResponse('success');

      await authStore.resetPassword({ email: testEmail });
      done();
    });

    test('failed password reset', async (done) => {
      mockAuthApi.resetPassword.setResponse('fail');

      try {
        await authStore.resetPassword({ email: testEmail });
      } catch (error) {
        expect(error.response.data.fieldErrors.email.length).toBeGreaterThan(0);
        done();
      }
    });
  });

  describe('create new password', () => {
    test('successful a new password creating', async (done) => {
      mockAuthApi.createNewPassword.setResponse('success');

      await authStore.createNewPassword({
        token: newPasswordToken,
        password: 1234,
        confirmedPassword: 1234,
      });
      done();
    });

    test('failed a new password creating', async (done) => {
      mockAuthApi.createNewPassword.setResponse('fail');

      try {
        await authStore.createNewPassword({
          token: newPasswordToken,
          password: 1234,
          confirmedPassword: 4322,
        });
      } catch (error) {
        expect(
          error.response.data.fieldErrors.password2.length,
        ).toBeGreaterThan(0);
        done();
      }
    });
  });
});
