// @flow
export type Token = string;
export type Url = string;

export type Data = {|
  token: Token,
  url: ?Url,
|};

export type Referral = {|
  email: string,
  date: number,
  txHash: string,
  bought: number,
  bonus: number,
  url: string,
|};
