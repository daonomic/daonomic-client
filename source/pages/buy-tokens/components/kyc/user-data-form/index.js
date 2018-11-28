// @flow
import * as React from 'react';
import { path } from 'ramda';
import { observable, action, runInAction } from 'mobx';
import { observer, inject } from 'mobx-react';
import { UserDataForm as UserDataFormView } from './view';
import { saveUserData } from '~/modules/user-data/actions';

import type { UserDataStore } from '~/modules/user-data/store';
import type { Address, Country, UserData } from '~/modules/user-data/types';

type InjectedProps = {|
  prospectiveAddress?: ?string,
  onSaveUserData(UserData): Promise<mixed>,
|};

type ExternalProps = {|
  countryRequired: boolean,
  onSubmit(): mixed,
|};

type Props = InjectedProps & ExternalProps;

type State = {|
  address: Address,
  confirmationAddress: Address,
  country: Country,
  errors: {
    common: ?(string[]),
    address: ?(string[]),
    country: ?(string[]),
  },
|};

class UserDataFormContainer extends React.Component<Props, State> {
  state = {
    address: this.props.prospectiveAddress || '',
    confirmationAddress: '',
    country: '',
    errors: {
      common: [],
      address: [],
      country: [],
    },
  };

  @observable
  isSaving = false;

  get userData(): UserData {
    if (this.props.countryRequired) {
      return {
        address: this.state.address,
        country: this.state.country,
      };
    }

    return {
      address: this.state.address,
    };
  }

  @action
  handleSubmit = async () => {
    this.isSaving = true;

    try {
      await this.props.onSaveUserData(this.userData);
      this.props.onSubmit();
    } catch (error) {
      const fieldErrors =
        path(['response', 'data', 'fieldErrors'], error) || {};

      this.setState({
        errors: {
          common: path(['response', 'data', 'genericErrors'], error) || [],
          address: fieldErrors.address || [],
          country: fieldErrors.country || [],
        },
      });
    }

    runInAction(() => {
      this.isSaving = false;
    });
  };

  handleChangeAddress = (address: Address) => {
    this.setState((state) => ({
      address,
      errors: {
        ...state.errors,
        address: [],
      },
    }));
  };

  handleChangeConfirmationAddress = (confirmationAddress: Address) => {
    this.setState({
      confirmationAddress,
    });
  };

  handleChangeCountry = (country: Country) => {
    this.setState((state) => ({
      country,
      errors: {
        ...state.errors,
        country: [],
      },
    }));
  };

  render() {
    return (
      <UserDataFormView
        isDisabled={this.isSaving}
        errors={this.state.errors}
        address={this.state.address || ''}
        onChangeAddress={this.handleChangeAddress}
        confirmationAddress={this.state.confirmationAddress}
        onChangeConfirmationAddress={this.handleChangeConfirmationAddress}
        countryRequired={this.props.countryRequired}
        country={this.state.country}
        onChangeCountry={this.handleChangeCountry}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export const UserDataForm: React.ComponentType<ExternalProps> = inject(
  ({ userData }: { userData: UserDataStore }): InjectedProps => ({
    prospectiveAddress: userData.model.prospectiveAddress,
    onSaveUserData: saveUserData,
  }),
)(observer(UserDataFormContainer));
