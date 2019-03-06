// @flow
import { observable, action, reaction } from 'mobx';
import { resolveRouteAction, getRouteUrl } from '~/domains/app/router/routes';
import { auth } from '~/domains/business/auth';

import type { IHistory, Location, Route } from '~/domains/app/router/types';

export class RouterStore {
  history: IHistory;

  @observable
  currentRoute: ?Route = null;

  constructor(options: { history: IHistory }) {
    this.history = options.history;
    this.history.listen(this.resolveRoute);
    this.resolveRoute(this.history.location);

    reaction(
      () => auth.isAuthenticated,
      (isAuthenticated) => {
        if (isAuthenticated) {
          this.history.push(getRouteUrl('app'));
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
      isAuthenticated: auth.isAuthenticated,
    });

    switch (action.type) {
      case 'redirect': {
        this.history.replace(getRouteUrl(action.to, action.params));
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
