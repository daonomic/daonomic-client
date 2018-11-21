// @flow
import { isRequestedRoute } from '~/domains/app/router/routes/utils/is-requested-route';
import type { UniversalRouterContext } from '~/domains/app/router/types';

export function exactMatch(fn: (context: UniversalRouterContext) => mixed) {
  return (context: UniversalRouterContext) => {
    if (isRequestedRoute(context)) {
      return fn(context);
    }
  };
}
