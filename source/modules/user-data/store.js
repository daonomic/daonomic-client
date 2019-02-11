// @flow
import { observable, action } from 'mobx';

import * as DataStateTypes from '~/domains/data/data-state/types';
import type { Address, Country } from '~/modules/user-data/types';

class UserDataModel {
  @observable dataState: DataStateTypes.DataState = 'initial';
  @observable prospectiveAddress: ?Address = null;
  @observable address: ?Address = null;
  @observable country: ?Country = null;
}

export class UserDataStore {
  @observable model = new UserDataModel();

  @action
  setDataState = (dataState: DataStateTypes.DataState) => {
    this.model.dataState = dataState;
  };

  @action
  setAddress = (address: Address) => {
    this.model.address = address;
  };

  @action
  setProspectiveAddress = (address: Address) => {
    this.model.prospectiveAddress = address;
  };

  @action
  setCountry = (country: Country) => {
    this.model.country = country;
  };

  @action
  reset = () => {
    this.model = new UserDataModel();
  };
}

export const userData = new UserDataStore();
