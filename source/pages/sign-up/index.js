// @flow
import * as React from 'react';
import { action, observable, computed, runInAction, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { registrationService } from '~/domains/business/auth';
import { SignUp } from '~/components/auth/signup';

import type { FormValidationError } from '~/types/common';
import * as DataStateTypes from '~/domains/data/data-state/types';
import type { ReferralProgramStore } from '~/domains/business/referral-program/store';
import type { IAuth } from '~/stores/auth/types';
import * as ReferralProgramTypes from '~/domains/business/referral-program/types';

type Props = {|
  referrerData: ?ReferralProgramTypes.ReferrerData,
  register: ({ email: string }) => Promise<mixed>,
|};

const initialErrors = {
  common: [],
  email: [],
};

@observer
class SignUpPage extends React.Component<Props> {
  @observable
  email: string = '';
  @observable
  registrationState: DataStateTypes.DataState = 'initial';
  @observable
  errors = initialErrors;

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
    const { email } = this;

    this.errors = initialErrors;
    this.registrationState = 'loading';
    this.props
      .register({ email })
      .then(() => {
        runInAction(() => {
          this.registrationState = 'loaded';
        });
        registrationService.persistRegisteredEmail(email);
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

  render() {
    return (
      <SignUp
        isLoading={this.isLoading}
        referrerData={this.props.referrerData}
        email={this.email}
        errors={toJS(this.errors)}
        isRegistered={this.isRegistered}
        onChangeEmail={this.handleChangeEmail}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default inject(
  ({
    auth,
    referralProgramStore,
  }: {|
    auth: IAuth,
    referralProgramStore: ReferralProgramStore,
  |}): Props => ({
    referrerData: referralProgramStore.referrerData,
    register: ({ email }) => {
      return auth.register({
        email,
        referralData: referralProgramStore.referrerData,
      });
    },
  }),
)(SignUpPage);
