// @flow
import type { UniversalRouterRoute } from '~/router/types';

export function getFullRoutePath(route: ?UniversalRouterRoute): string {
  if (!route) {
    return '';
  }

  return `${getFullRoutePath(route.parent)}${route.path || ''}`;
}
