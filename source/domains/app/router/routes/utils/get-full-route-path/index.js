// @flow
import type { UniversalRouterRoute } from '~/domains/app/router/types';

export function getFullRoutePath(route: ?UniversalRouterRoute): string {
  if (!route) {
    return '';
  }

  return `${getFullRoutePath(route.parent)}${route.path || ''}`;
}
