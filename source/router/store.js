// @flow
import { observable, action, reaction } from 'mobx';
import { resolveRouteAction, getRouteUrl } from '~/router/routes';

import type { IHistory, IRouterAuth, Location, Route } from '~/router/types';

export class RouterStore {
  history: IHistory;
  auth: IRouterAuth;

  @observable currentRoute: ?Route = null;

  constructor(options: { history: IHistory, auth: IRouterAuth }) {
    this.history = options.history;
    this.auth = options.auth;
    this.history.listen(this.resolveRoute);
    this.resolveRoute(this.history.location);

    reaction(
      () => this.auth.isAuthenticated,
      (isAuthenticated) => {
        if (isAuthenticated) {
          this.history.push(
            (this.history.location.state || {}).from || getRouteUrl('app'),
          );
        } else {
          this.history.push(getRouteUrl('signIn'));
        }
      },
    );
  }

  @action
  handleChangeRoute = (newRoute: Route) => {
    this.currentRoute = newRoute;
  };

  resolveRoute = async (location: Location) => {
    const action = await resolveRouteAction({
      pathname: `${location.pathname}${location.hash}`,
      isAuthenticated: this.auth.isAuthenticated,
    });

    switch (action.type) {
      case 'redirect': {
        this.history.replace(getRouteUrl(action.to, action.params), {
          from: action.from,
        });
        break;
      }

      case 'route': {
        this.handleChangeRoute({
          name: action.name,
          params: action.params,
        });
        break;
      }
    }
  };
}
