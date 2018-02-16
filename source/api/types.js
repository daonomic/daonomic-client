export type AuthParams = {
  email: string,
  password?: string,
};

export type PasswordResetParams = {
  token: string,
  password: string,
  confirmedPassword: string,
};

export type PaymentParams = {
  saleId: string,
  tokenId: string,
};
