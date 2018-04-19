// @flow
import UniversalRouter from 'universal-router';
import { createRoute, createRedirect } from '~/router/actions';
import { exactMatch } from '~/router/utils/exact-match';

const notFoundAction = () => createRedirect({ to: 'signIn' });

export const routes = new UniversalRouter([
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
                  from: {
                    pathname: context.pathname,
                    search: context.search,
                  },
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
    action: notFoundAction,
  },
]);

export const resolveRoute = routes.resolve.bind(routes);
