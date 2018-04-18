// @flow
import type { AuthToken, UserId, PasswordRecoveryParams } from '~/types/auth';

export interface IAuthToken {
  value: ?AuthToken;
  set: (value: AuthToken) => void;
  reset: () => void;
}

export interface IAuth {
  token: IAuthToken;
  id: UserId;

  +isAuthenticated: boolean;

  setId: (id: UserId) => void;
  setToken: (token: AuthToken) => void;

  login({ email: string, password: string }): Promise<void>;
  register({ email: string }): Promise<{}>;
  resetPassword({ email: string }): Promise<{}>;
  createNewPassword: (params: PasswordRecoveryParams) => Promise<{}>;

  logout: () => void;
}
