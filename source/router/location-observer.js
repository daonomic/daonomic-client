import { reaction } from 'mobx';
import history from '~/router/history';
import { resolveRoute } from '~/router/routes';
import getRouteUrl from '~/router/get-route-url';

export function initLocationObserver(routerStore, auth) {
  function handleLocationChange(location) {
    resolveRoute({
      pathname: `${location.pathname}${location.hash}`,
      isAuthenticated: auth.isAuthenticated,
    }).then((action) => {
      switch (action.type) {
        case 'redirect': {
          history.replace(getRouteUrl(action.to, action.params), {
            from: action.from,
          });
          break;
        }

        case 'route': {
          routerStore.setRoute({
            route: {
              name: action.name,
              params: action.params,
            },
          });
          break;
        }
      }
    });
  }

  history.listen(handleLocationChange);
  handleLocationChange(history.location);

  reaction(
    () => auth.isAuthenticated,
    (isAuthenticated) => {
      if (isAuthenticated) {
        history.push((history.location.state || {}).from || getRouteUrl('app'));
      } else {
        history.push(getRouteUrl('signIn'));
      }
    },
  );
}
