// @flow
import { history } from '~/domains/app/router/history';
import { RouterStore } from '~/domains/app/router/store';
export { getRouteUrl } from '~/domains/app/router/routes';

export const router = new RouterStore({ history });
