// @flow
export type Address = string;
export type Country = string;

export type UserData = {|
  address: Address,
  country?: Country,
|};
