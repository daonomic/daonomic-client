// @flow
import { getFullRoutePath } from '~/domains/app/router/routes/utils/get-full-route-path';
import { fillPathParams } from '~/domains/app/router/routes/utils/fill-path-params';

import type { UniversalRouterContext } from '~/domains/app/router/types';

export function isRequestedRoute(context: UniversalRouterContext) {
  const fullRoutePath = getFullRoutePath(context.route);

  return (
    context.pathname ===
    fillPathParams({ path: fullRoutePath || '/', params: context.params })
  );
}
