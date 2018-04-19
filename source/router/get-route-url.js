// @flow
import generateUrls from 'universal-router/generateUrls';
import { routes } from '~/router/routes';

import type { RouteName, RouteParams } from '~/router/types';

const getRouteUrl: (
  routeName: RouteName,
  params?: RouteParams,
) => string = generateUrls(routes);

export default getRouteUrl;
