// @flow

export type RouteName =
  | 'signIn'
  | 'signUp'
  | 'resetPassword'
  | 'createNewPassword'
  | 'app'
  | 'buyTokens'
  | 'createWallet'
  | 'faq';

export type RouteParams = {
  [key: string]: string,
};

export type Route = {|
  name: RouteName,
  params: RouteParams,
|};

export type UniversalRouterRoute = Route & {|
  path: string,
  parent?: UniversalRouterRoute,
|};

export type UniversalRouterContext = {|
  pathname: string,
  search: string,
  route: UniversalRouterRoute,
  params: RouteParams,
|};

export type Location = {
  pathname: string,
  search: string,
  hash: string,
  state?: any,
};

export interface IHistory {
  location: Location;
  push(string, ?{}): void;
  replace(string, ?{}): void;
  listen((Location) => any): Function;
}

export interface IRouterAuth {
  isAuthenticated: boolean;
}
