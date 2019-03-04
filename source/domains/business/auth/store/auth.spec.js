import mockedApi from '~/domains/app/api/mock';
import { freshAuthTokenProvider } from './token';
import { authProvider } from '.';

describe('auth store', () => {
  const testEmail = 'pupkin@yandex.ru';
  const testPassword = '12341234';
  const newPasswordToken = 'asdf';

  describe('setToken', () => {
    test('successful token set', () => {
      const authStore = authProvider({}, freshAuthTokenProvider());

      expect(authStore.token.value).toBe(null);
      authStore.setToken('1234');
      expect(authStore.token.value).toBe('1234');
    });
  });

  describe('logout', () => {
    test('successful logout', () => {
      const authStore = authProvider({}, freshAuthTokenProvider());

      authStore.setToken('123123');

      expect(authStore.isAuthenticated).toBe(true);
      authStore.logout();
      expect(authStore.isAuthenticated).toBe(false);
    });
  });

  describe('registration', () => {
    test('successful registration', async (done) => {
      mockedApi.auth.register.setResponse('success');
      const authStore = authProvider(mockedApi, freshAuthTokenProvider());

      await authStore.register({ email: testEmail });
      done();
    });

    test('failed registration', async (done) => {
      mockedApi.auth.register.setResponse('fail');
      const authStore = authProvider(mockedApi, freshAuthTokenProvider());

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
      const authStore = authProvider(mockedApi, freshAuthTokenProvider());

      await authStore.login({ email: testEmail, password: testPassword });
      expect(authStore.isAuthenticated).toBe(true);
      expect(authStore.id).toBe(1);
      done();
    });

    test('failed login', async (done) => {
      mockedApi.auth.login.setResponse('fail');
      const authStore = new authProvider(mockedApi, freshAuthTokenProvider());

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
      const authStore = authProvider(mockedApi, freshAuthTokenProvider());

      await authStore.resetPassword({ email: testEmail });
      done();
    });

    test('failed password reset', async (done) => {
      mockedApi.auth.resetPassword.setResponse('fail');
      const authStore = authProvider(mockedApi, freshAuthTokenProvider());

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
      mockedApi.auth.createNewPassword.setResponse('success');
      const authStore = authProvider(mockedApi, freshAuthTokenProvider());

      await authStore.createNewPassword({
        token: newPasswordToken,
        password: 1234,
        confirmedPassword: 1234,
      });
      done();
    });

    test('failed a new password creating', async (done) => {
      mockedApi.auth.createNewPassword.setResponse('fail');
      const authStore = authProvider(mockedApi, freshAuthTokenProvider());

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
