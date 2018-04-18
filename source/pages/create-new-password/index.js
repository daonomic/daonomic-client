// @flow
import * as React from 'react';
import { action, observable, computed, runInAction, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import CreateNewPassword from '~/components/auth/create-new-password';

import type { DataState, FormValidationError } from '~/types/common';

type InjectedProps = {|
  createNewPassword: Function,
|};

type Props = InjectedProps & {|
  match: {
    params: {
      token: string,
    },
  },
|};

const initialErrors = {
  password: [],
  confirmedPassword: [],
  common: [],
};

@observer
class CreateNewPasswordPage extends React.Component<Props> {
  @observable password: string = '';
  @observable confirmedPassword: string = '';
  @observable passwordCreationState: DataState = 'initial';
  @observable errors = initialErrors;

  @computed
  get isLoading(): boolean {
    return this.passwordCreationState === 'loading';
  }

  @computed
  get isNewPasswordCreated(): boolean {
    return this.passwordCreationState === 'loaded';
  }

  @action
  setPassword = (password) => {
    this.password = password;
  };

  @action
  setConfirmedPassword = (password) => {
    this.confirmedPassword = password;
  };

  @action
  createNewPassword = () => {
    this.passwordCreationState = 'loading';
    this.props
      .createNewPassword({
        token: this.props.match.params.token,
        password: this.password,
        confirmedPassword: this.confirmedPassword,
      })
      .then(() => {
        runInAction(() => {
          this.passwordCreationState = 'loaded';
        });
      })
      .catch((error: FormValidationError) => {
        runInAction(() => {
          const { genericErrors, fieldErrors = {}, reason } =
            error.response.data || {};

          this.passwordCreationState = 'failed';
          this.errors = {
            password: fieldErrors.password || [],
            confirmedPassword: fieldErrors.password2 || [],
            common: genericErrors || [].concat(reason || []),
          };
        });
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.createNewPassword();
  };

  handleChangePassword = (event) => {
    this.setPassword(event.target.value);
  };

  handleChangeConfirmedPassword = (event) => {
    this.setConfirmedPassword(event.target.value);
  };

  render() {
    return (
      <CreateNewPassword
        password={this.password}
        confirmedPassword={this.confirmedPassword}
        errors={toJS(this.errors)}
        isSaving={this.isLoading}
        isNewPasswordCreated={this.isNewPasswordCreated}
        onSubmit={this.handleSubmit}
        onChangePassword={this.handleChangePassword}
        onChangeConfirmedPassword={this.handleChangeConfirmedPassword}
      />
    );
  }
}

export default inject(({ auth }): InjectedProps => ({
  createNewPassword: auth.createNewPassword,
}))(CreateNewPasswordPage);
