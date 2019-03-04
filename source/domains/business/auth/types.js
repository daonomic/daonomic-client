// @flow
import * as ReferralProgramTypes from '~/domains/business/referral-program/types';

export type AuthToken = string;
export type PasswordRecoveryToken = string;
export type UserId = string;

export type PasswordRecoveryParams = {|
  token: PasswordRecoveryToken,
  password: string,
  confirmedPassword: string,
|};

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
  register({|
    email: string,
    referralData: ?ReferralProgramTypes.ReferrerData,
  |}): Promise<{}>;
  resetPassword({ email: string }): Promise<{}>;
  createNewPassword: (params: PasswordRecoveryParams) => Promise<{}>;

  logout: () => void;
}
