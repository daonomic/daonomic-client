// @flow
import type { Route } from '~/router/types';

export function getFullRoutePath(route: ?Route): string {
  if (!route) {
    return '';
  }

  return `${getFullRoutePath(route.parent)}${route.path || ''}`;
}
