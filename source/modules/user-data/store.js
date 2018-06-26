// @flow
import { observable, action } from 'mobx';

import type { DataState } from '~/types/common';
import type { Address, Country } from '~/modules/user-data/types';

class UserDataModel {
  @observable dataState: DataState = 'initial';
  @observable prospectiveAddress: ?Address = null;
  @observable address: ?Address = null;
  @observable country: ?Country = null;
}

export class UserDataStore {
  @observable model = new UserDataModel();

  @action
  setDataState = (dataState: DataState) => {
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
