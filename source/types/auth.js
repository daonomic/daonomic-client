// @flow
export type AuthToken = string;
export type PasswordRecoveryToken = string;
export type Email = string;
export type Password = string;
export type UserId = string;

export type PasswordRecoveryParams = {|
  token: PasswordRecoveryToken,
  password: Password,
  confirmationPassword: Password,
|};
