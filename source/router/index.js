// @flow
import { history } from '~/router/history';
import { RouterStore } from '~/router/store';
export { getRouteUrl } from '~/router/routes';

import type { IRouterAuth } from '~/router/types';

export function routerProvider(auth: IRouterAuth) {
  return new RouterStore({ history, auth });
}
