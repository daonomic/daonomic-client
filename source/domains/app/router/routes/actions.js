// @flow
import type {
  RouteName,
  RouteParams,
  UniversalRouterContext,
} from '~/domains/app/router/types';

export function createRoute(context: UniversalRouterContext) {
  return {
    type: 'route',
    name: context.route.name,
    params: context.params,
  };
}

export function createRedirect({
  to,
  params,
}: {|
  to: RouteName,
  from?: UniversalRouterContext,
  params?: RouteParams,
|}) {
  return {
    type: 'redirect',
    to,
    params,
  };
}
