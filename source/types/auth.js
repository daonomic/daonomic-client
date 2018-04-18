// @flow
export type AuthToken = string;
export type PasswordRecoveryToken = string;
export type UserId = string;

export type PasswordRecoveryParams = {|
  token: PasswordRecoveryToken,
  password: string,
  confirmedPassword: string,
|};
