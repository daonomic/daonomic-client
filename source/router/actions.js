// @flow
import type {
  RouteName,
  RouteParams,
  UniversalRouterContext,
  RouterContext,
  RouterActionRoute,
  RouterActionRedirect,
} from '~/router/types';

export function createRoute(
  context: UniversalRouterContext,
): RouterActionRoute {
  return {
    type: 'route',
    name: context.route.name,
    params: context.params,
  };
}

export function createRedirect({
  to,
  from,
  params,
}: {|
  to: RouteName,
  from?: RouterContext,
  params?: RouteParams,
|}): RouterActionRedirect {
  return {
    type: 'redirect',
    to,
    from,
    params,
  };
}
