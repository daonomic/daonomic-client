// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { observable, action, runInAction, toJS } from 'mobx';
import { SignIn } from '~/components/auth/signin';
import { registrationService } from '~/domains/business/auth';

import type { FormValidationError } from '~/types/common';
import type { RootStore } from '~/domains/app/stores';

type ExternalProps = {||};

type Props = ExternalProps & {|
  login: Function,
|};

const initialErrors = {
  email: [],
  password: [],
  common: [],
};

@observer
class SignInPageContainer extends React.Component<Props> {
  @observable email: string =
    registrationService.getPersistedRegisteredEmail() || '';

  @observable password: string = '';
  @observable isLoading: boolean = false;
  @observable errors = initialErrors;

  @action
  setEmail = (email: string) => {
    this.email = email;
  };

  @action
  setPassword = (password: string) => {
    this.password = password;
  };

  @action
  login = () => {
    this.errors = initialErrors;
    this.isLoading = true;
    this.props
      .login({
        email: this.email,
        password: this.password,
      })
      .catch((error: FormValidationError) => {
        runInAction(() => {
          const { genericErrors, fieldErrors = {}, reason } =
            error.response.data || {};

          this.isLoading = false;
          this.errors = {
            email: fieldErrors.email || [],
            password: fieldErrors.password || [],
            common: genericErrors || [].concat(reason || []),
          };
        });
      });
  };

  handleChangeEmail = (event) => {
    this.setEmail(event.target.value);
  };

  handleChangePassword = (event) => {
    this.setPassword(event.target.value);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.login();
  };

  render() {
    return (
      <SignIn
        email={this.email}
        password={this.password}
        errors={toJS(this.errors)}
        isLoading={this.isLoading}
        onSubmit={this.handleSubmit}
        onChangeEmail={this.handleChangeEmail}
        onChangePassword={this.handleChangePassword}
      />
    );
  }
}

export const SignInPage: React.ComponentType<ExternalProps> = inject(
  ({ auth }: RootStore): $Diff<Props, ExternalProps> => ({
    login: auth.login,
  }),
)(SignInPageContainer);
