// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Button, Input, Panel, Text } from '@daonomic/ui';
import { Heading } from '~/components/heading';
import { Link } from '~/components/link';
import { getMarker } from '~/utils/get-marker';
import { AuthLayout } from '../layout';
import commonStyles from '../common.css';
import { getRouteUrl } from '~/domains/app/router';
import styles from './styles.css';

import * as ReferralProgramTypes from '~/domains/business/referral-program/types';

type Props = {|
  email: string,
  errors: {|
    common: string[],
    email: string[],
  |},
  referrerData: ?ReferralProgramTypes.ReferrerData,
  isLoading: boolean,
  isRegistered: boolean,
  onSubmit: Function,
  onChangeEmail: Function,
|};

export class SignUp extends React.Component<Props> {
  static defaultProps = {
    email: '',
  };

  marker = getMarker('sign-up');

  renderCommonError = () => {
    const { common, email } = this.props.errors;
    const errors = common.concat(email);

    if (errors.length === 0) {
      return null;
    }

    return (
      <div className={commonStyles.row}>
        <div
          className={commonStyles.error}
          data-marker={this.marker('error')()}
        >
          {errors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      </div>
    );
  };

  renderForm = () => {
    const {
      isLoading,
      referrerData,
      email,
      onSubmit,
      onChangeEmail,
      isRegistered,
    } = this.props;

    if (isRegistered) {
      return null;
    }

    return (
      <React.Fragment>
        {referrerData && referrerData.token.length > 0 && (
          <p>
            <Trans>
              Congrats! Referral code <mark>{referrerData.token}</mark> is
              applied and you will get bonus for tokens purchase.
            </Trans>
          </p>
        )}

        <form data-marker={this.marker('form')()} onSubmit={onSubmit}>
          <div className={commonStyles.row}>
            <Input
              data-marker={this.marker('email')()}
              required
              value={email}
              type="email"
              label={<Trans>Email</Trans>}
              onChange={onChangeEmail}
              disabled={isLoading}
            />
          </div>

          <div className={commonStyles.footer}>
            <Button
              data-marker={this.marker('submit')()}
              design="primary"
              type="submit"
              disabled={isLoading}
            >
              <Trans>Sign up</Trans>
            </Button>
          </div>
        </form>
      </React.Fragment>
    );
  };

  renderSuccessMessage = () => {
    const { isRegistered } = this.props;

    if (!isRegistered) {
      return null;
    }

    return (
      <Text
        data-marker={this.marker('success-message')()}
        color="muted"
        element="p"
      >
        <Trans>Password has been sent to email</Trans>
      </Text>
    );
  };

  render() {
    return (
      <AuthLayout>
        <Panel>
          <Heading size="large" tagName="h1" className={commonStyles.title}>
            <Trans id="auth.signUpHeading" />
          </Heading>

          {this.renderCommonError()}
          {this.renderForm()}
          {this.renderSuccessMessage()}
        </Panel>

        <Panel>
          <Text
            color="muted"
            align="center"
            element="p"
            className={styles.paragraph}
          >
            <Trans>Already have an account?</Trans>{' '}
            <Link
              data-marker={this.marker('sign-in-link')()}
              href={getRouteUrl('signIn')}
            >
              <Trans>Log In</Trans>
              &nbsp;⟩
            </Link>
          </Text>
        </Panel>
      </AuthLayout>
    );
  }
}
