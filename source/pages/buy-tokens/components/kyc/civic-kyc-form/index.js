// @flow
import * as React from 'react';
import { message } from 'antd';
import axios from 'axios';
import raven from 'raven-js';
import { observable, when } from 'mobx';
import { observer } from 'mobx-react';
import { fromPromise } from 'mobx-utils';
import { Button } from '@daonomic/ui';
import { initCivicSip } from '~/modules/kyc/civic';
import { loadAndSetKycState } from '~/modules/kyc/actions';
import { getTranslation } from '~/i18n';

export type Props = {|
  action: string,
  applicationId: string,
|};

@observer
export class CivicKycForm extends React.Component<Props> {
  @observable
  civicSip = fromPromise(
    initCivicSip({ applicationId: this.props.applicationId }),
  );

  constructor(...args: any[]) {
    super(...args);

    when(
      () => this.civicSip.state === 'fulfilled',
      (): void => {
        this.civicSip.value.on(
          'auth-code-received',
          this.handleReceiveAuthCode,
        );
      },
    );
  }

  handleReceiveAuthCode = async (event: any) => {
    const jwtToken = event.response;

    try {
      raven.captureBreadcrumb({
        message: 'Save Civic JWT token',
      });
      await axios.post(this.props.action, {
        jwtToken,
      });
      await loadAndSetKycState();
    } catch (error) {
      raven.captureException(error);
      message.error(getTranslation('common:somethingWentWrongTryAgain'));
    }
  };

  handleClickVerify = () => {
    this.civicSip.value.signup({
      style: 'popup',
      scopeRequest: this.civicSip.value.ScopeRequests.BASIC_SIGNUP,
    });
  };

  render() {
    return this.civicSip.case({
      pending: () => `${getTranslation('common:loading')}...`,
      fulfilled: () => (
        <Button design="primary" onClick={this.handleClickVerify}>
          {getTranslation('kyc:verifyIdentityWithCivic')}
        </Button>
      ),
      rejected: () => getTranslation('common:somethingWentWrongTryAgain'),
    });
  }
}
