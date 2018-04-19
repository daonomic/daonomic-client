// @flow
import { observable, action } from 'mobx';
import type { Route } from '~/router/types';

export class RouterStore {
  @observable currentRoute: ?Route = null;

  @action
  setRoute = ({ route }: { route: Route }) => {
    this.currentRoute = route;
  };
}

export function routerProvider() {
  return new RouterStore();
}
