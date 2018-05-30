// @flow
import { isRequestedRoute } from '~/router/routes/utils/is-requested-route';
import type { UniversalRouterContext } from '~/router/types';

export function exactMatch(fn: (context: UniversalRouterContext) => mixed) {
  return (context: UniversalRouterContext) => {
    if (isRequestedRoute(context)) {
      return fn(context);
    }
  };
}
