// @flow
import * as React from 'react';
import { action, observable, runInAction, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { CreateNewPassword } from '~/components/auth/create-new-password';

import type { FormValidationError } from '~/types/common';
import * as DataStateTypes from '~/domains/data/data-state/types';
import type { RootStore } from '~/domains/app/stores';

type ExternalProps = {|
  token: string,
|};

type Props = ExternalProps & {|
  createNewPassword: Function,
|};

const initialErrors = {
  password: [],
  confirmedPassword: [],
  common: [],
};

@observer
class CreateNewPasswordPageContainer extends React.Component<Props> {
  @observable password: string = '';
  @observable confirmedPassword: string = '';
  @observable passwordCreationState: DataStateTypes.DataState = 'idle';
  @observable errors = initialErrors;

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
        token: this.props.token,
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
        isSaving={this.passwordCreationState === 'loading'}
        isNewPasswordCreated={this.passwordCreationState === 'loaded'}
        onSubmit={this.handleSubmit}
        onChangePassword={this.handleChangePassword}
        onChangeConfirmedPassword={this.handleChangeConfirmedPassword}
      />
    );
  }
}

export const CreateNewPasswordPage: React.ComponentType<ExternalProps> = inject(
  ({ auth }: RootStore): $Diff<Props, ExternalProps> => ({
    createNewPassword: auth.createNewPassword,
  }),
)(CreateNewPasswordPageContainer);
