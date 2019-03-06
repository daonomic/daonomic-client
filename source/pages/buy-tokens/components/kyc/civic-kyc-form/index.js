// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans, t } from '@lingui/macro';
import { message } from 'antd';
import axios from 'axios';
import raven from 'raven-js';
import { observable, when } from 'mobx';
import { observer } from 'mobx-react';
import { fromPromise } from 'mobx-utils';
import { Button } from '@daonomic/ui';
import { kycService } from '~/domains/business/kyc';
import { i18n } from '~/domains/app/i18n';
import { initCivicSip } from './civic';

type ExternalProps = {|
  action: string,
  applicationId: string,
|};

type Props = ExternalProps & {|
  i18n: any,
|};

export const CivicKycForm = observer(
  class extends React.Component<Props> {
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
        await kycService.loadKycState();
      } catch (error) {
        raven.captureException(error);
        message.error(i18n._(t`Something went wrong, please try again`));
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
        pending: () => <Trans>Loading...</Trans>,
        fulfilled: () => (
          <Button design="primary" onClick={this.handleClickVerify}>
            <Trans>Verify identity with Civic</Trans>
          </Button>
        ),
        rejected: () => <Trans>Something went wrong, please try again</Trans>,
      });
    }
  },
);
