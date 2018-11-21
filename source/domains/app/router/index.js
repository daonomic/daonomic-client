// @flow
import { history } from '~/domains/app/router/history';
import { RouterStore } from '~/domains/app/router/store';
export { getRouteUrl } from '~/domains/app/router/routes';

import type { IRouterAuth } from '~/domains/app/router/types';

export function routerProvider(auth: IRouterAuth) {
  return new RouterStore({ history, auth });
}
