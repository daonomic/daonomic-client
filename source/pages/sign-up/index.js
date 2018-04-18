// @flow
import * as React from 'react';
import { action, observable, computed, runInAction, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import SignUp from '~/components/auth/signup';

import type { FormValidationError, DataState } from '~/types/common';

type Props = {|
  register: Function,
|};

const initialErrors = {
  common: [],
  email: [],
};

@observer
class SignUpPage extends React.Component<Props> {
  @observable email: string = '';
  @observable registrationState: DataState = 'initial';
  @observable errors = initialErrors;

  @computed
  get isLoading(): boolean {
    return this.registrationState === 'loading';
  }

  @computed
  get isRegistered(): boolean {
    return this.registrationState === 'loaded';
  }

  @action
  setEmail = (email) => {
    this.email = email;
  };

  @action
  register = () => {
    this.errors = initialErrors;
    this.registrationState = 'loading';
    this.props
      .register({ email: this.email })
      .then(() => {
        runInAction(() => {
          this.registrationState = 'loaded';
        });
      })
      .catch((error: FormValidationError) => {
        runInAction(() => {
          const { genericErrors, fieldErrors = {}, reason } =
            error.response.data || {};

          this.registrationState = 'failed';
          this.errors = {
            email: fieldErrors.email || [],
            common: genericErrors || [].concat(reason || []),
          };
        });
      });
  };

  handleChangeEmail = (event) => {
    this.setEmail(event.target.value);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.register();
  };

  render = () => {
    return (
      <SignUp
        isLoading={this.isLoading}
        email={this.email}
        errors={toJS(this.errors)}
        isRegistered={this.isRegistered}
        onChangeEmail={this.handleChangeEmail}
        onSubmit={this.handleSubmit}
      />
    );
  };
}

export default inject(({ auth }): Props => ({
  register: auth.register,
}))(SignUpPage);
