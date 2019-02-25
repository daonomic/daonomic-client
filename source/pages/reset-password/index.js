// @flow
import * as React from 'react';
import { action, observable, computed, toJS, runInAction } from 'mobx';
import { inject, observer } from 'mobx-react';
import ResetPassword from '~/components/auth/reset-password';

import type { FormValidationError } from '~/types/common';
import * as DataStateTypes from '~/domains/data/data-state/types';

type Props = {|
  resetPassword: Function,
|};

const initialErrors = {
  common: [],
  email: [],
};

@observer
class ResetPasswordPage extends React.Component<Props> {
  @observable email: string = '';
  @observable passwordResetState: DataStateTypes.DataState = 'idle';
  @observable errors = initialErrors;

  @computed
  get isLoading(): boolean {
    return this.passwordResetState === 'loading';
  }

  @computed
  get isPasswordReset(): boolean {
    return this.passwordResetState === 'loaded';
  }

  @action
  setEmail = (email) => {
    this.email = email;
  };

  @action
  resetPassword = () => {
    this.errors = initialErrors;
    this.passwordResetState = 'loading';
    this.props
      .resetPassword({ email: this.email })
      .then(() => {
        runInAction(() => {
          this.passwordResetState = 'loaded';
        });
      })
      .catch((error: FormValidationError) => {
        runInAction(() => {
          const { genericErrors, fieldErrors = {}, reason } =
            error.response.data || {};

          this.passwordResetState = 'failed';
          this.errors = {
            email: fieldErrors.email || [],
            common: genericErrors || [].concat(reason || []),
          };
        });
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.resetPassword();
  };

  handleChangeEmail = (event) => {
    this.setEmail(event.target.value);
  };

  render() {
    return (
      <ResetPassword
        email={this.email}
        errors={toJS(this.errors)}
        isSaving={this.isLoading}
        isPasswordReset={this.isPasswordReset}
        onSubmit={this.handleSubmit}
        onChangeEmail={this.handleChangeEmail}
      />
    );
  }
}

export default inject(
  ({ auth }): Props => ({
    resetPassword: auth.resetPassword,
  }),
)(ResetPasswordPage);
