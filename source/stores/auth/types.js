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

  login: (params: AuthParams) => Promise<{ success: boolean }>;
  register: (params: AuthParams) => Promise<void>;
  resetPassword: (params: AuthParams) => Promise<void>;
  createNewPassword: (params: PasswordRecoveryParams) => Promise<void>;

  resetErrors: () => void;
  resetRegistrationData: () => void;
  logout: () => void;
}
