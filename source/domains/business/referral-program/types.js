// @flow
export type Token = string;
export type Url = string;

export type Statistics = {|
  users: number,
  sold: number,
  bonus: number,
|};

export type UserData = {|
  token: Token,
  statistics: Statistics,
|};

export type ReferrerData = {|
  token: Token,
  url: ?Url,
|};

export type Referral = {|
  email: string,
  registrationDate: number,
  sold: number,
  bonus: number,
  source: string,
|};
