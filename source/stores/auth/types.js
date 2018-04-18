// @flow
import type {
  AuthToken,
  Email,
  UserId,
  AuthParams,
  PasswordRecoveryParams,
} from '~/types/auth';

export interface IAuthToken {
  value: ?AuthToken;
  set: (value: AuthToken) => void;
  reset: () => void;
}

export interface IAuth {
  token: IAuthToken;
  email: Email;
  id: UserId;

  +isAuthenticated: boolean;
  isRegistered: boolean;
  isPasswordReset: boolean;
  isNewPasswordCreated: boolean;
  isLoading: boolean;

  errors: {
    email: string,
    password: string,
    confirmationPassword: string,
    common: string,
  };

  setId: (id: UserId) => void;
  setToken: (token: AuthToken) => void;
  setEmail: (email: Email) => void;

  login({ email: string, password: string }): Promise<void>;
  register({ email: string }): Promise<{}>;
  resetPassword: (params: AuthParams) => Promise<void>;
  createNewPassword: (params: PasswordRecoveryParams) => Promise<void>;

  resetErrors: () => void;
  resetRegistrationData: () => void;
  logout: () => void;
}
