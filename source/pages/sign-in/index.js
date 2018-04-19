// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { observable, action, runInAction, toJS } from 'mobx';
import SignIn from '~/components/auth/signin';

import type { FormValidationError } from '~/types/common';

type InjectedProps = {|
  login: Function,
|};

type Props = InjectedProps & {|
  location: {|
    state: {
      from: {
        pathname: string,
      },
    },
    pathname: string,
  |},
|};

const initialErrors = {
  email: [],
  password: [],
  common: [],
};

@observer
class SignInPage extends React.Component<Props> {
  @observable email: string = '';
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

export default inject(({ auth }): InjectedProps => ({
  login: auth.login,
}))(SignInPage);
