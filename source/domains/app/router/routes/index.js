// @flow
import UniversalRouter from 'universal-router';
import generateUrls from 'universal-router/generateUrls';
import {
  createRoute,
  createRedirect,
} from '~/domains/app/router/routes/actions';
import { exactMatch } from '~/domains/app/router/routes/utils/exact-match';

import type { RouteName, RouteParams } from '~/domains/app/router/types';

const routes = new UniversalRouter([
  {
    path: '',
    action: exactMatch(() => createRedirect({ to: 'buyTokens' })),
    children: [
      {
        path: '/#',
        action: exactMatch(() => createRedirect({ to: 'buyTokens' })),
        children: [
          {
            path: '/sign',
            children: [
              {
                path: '/',
                action: exactMatch(() => createRedirect({ to: 'signIn' })),
              },
              {
                path: '/in',
                name: 'signIn',
                action: exactMatch(createRoute),
              },
              {
                path: '/up',
                name: 'signUp',
                action: exactMatch(createRoute),
              },
              {
                path: '/reset-password',
                name: 'resetPassword',
                action: exactMatch(createRoute),
              },
              {
                path: '/create-new-password/:token',
                name: 'createNewPassword',
                action: exactMatch(createRoute),
              },
            ],
          },
          {
            path: '/app',
            name: 'app',
            action: (context) => {
              if (!context.isAuthenticated) {
                return createRedirect({
                  to: 'signIn',
                });
              }

              return exactMatch(() => createRedirect({ to: 'buyTokens' }))(
                context,
              );
            },
            children: [
              {
                path: '/',
                action: exactMatch(() => createRedirect({ to: 'buyTokens' })),
              },
              {
                path: '/buy',
                name: 'buyTokens',
                action: exactMatch(createRoute),
              },
              {
                path: '/create-wallet',
                name: 'createWallet',
                action: exactMatch(createRoute),
              },
              {
                path: '/referral',
                name: 'referral',
                action: exactMatch(createRoute),
              },
              {
                path: '/faq',
                name: 'faq',
                action: exactMatch(createRoute),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: /.*/, // 404
    action: () => createRedirect({ to: 'signIn' }),
  },
]);

export const resolveRouteAction = routes.resolve.bind(routes);

export const getRouteUrl: (
  routeName: RouteName,
  params?: RouteParams,
) => string = generateUrls(routes);
