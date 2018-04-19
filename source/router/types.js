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
  path: string,
  parent?: Route,
|};

export type RouterContext = {|
  pathname: string,
  search: string,
|};

export type UniversalRouterContext = RouterContext & {|
  route: Route,
  params: RouteParams,
|};

export type RouterActionRedirect = {|
  type: 'redirect',
  to: RouteName,
  from?: RouterContext,
  params?: RouteParams,
|};

export type RouterActionRoute = {|
  type: 'route',
  name: RouteName,
  params: RouteParams,
|};

export type RouterAction = RouterActionRedirect | RouterActionRoute;
