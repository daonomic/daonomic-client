// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Link } from '~/components/link';
import { Button, Input, Panel, Text } from '@daonomic/ui';
import { Heading } from '~/components/heading';
import Layout from '../layout';
import commonStyles from '../common.css';
import { getMarker } from '~/utils/get-marker';
import { getRouteUrl } from '~/domains/app/router';
import styles from './styles.css';

type Props = {|
  email: string,
  errors: {|
    email: string[],
    common: string[],
  |},
  isSaving: boolean,
  isPasswordReset: boolean,
  onChangeEmail: Function,
  onSubmit: Function,
|};

export default class ResetPassword extends React.Component<Props> {
  marker = getMarker('reset-password');

  renderCommonError = () => {
    const { common } = this.props.errors;

    if (common.length === 0) {
      return;
    }

    return (
      <div className={commonStyles.row}>
        <div
          className={commonStyles.error}
          data-marker={this.marker('error')()}
        >
          {common.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      </div>
    );
  };

  renderForm = () => {
    const { onSubmit, isSaving, onChangeEmail, email, errors } = this.props;

    return (
      <Panel>
        <form data-marker={this.marker('form')()} onSubmit={onSubmit}>
          <Heading size="large" tagName="h1" className={commonStyles.title}>
            <Trans>Forgot password?</Trans>
          </Heading>

          <Text color="muted" element="p" className={commonStyles.row}>
            <Trans>
              Enter the email address you used when you joined and we’ll send
              you instructions to reset your password.
            </Trans>
          </Text>

          {this.renderCommonError()}

          <div className={commonStyles.row}>
            <Input
              required
              data-marker={this.marker('email')()}
              value={email}
              type="email"
              label={<Trans>Email</Trans>}
              errors={errors.email}
              onChange={onChangeEmail}
              disabled={isSaving}
            />
          </div>

          <div className={commonStyles.footer}>
            <Button
              data-marker={this.marker('submit')()}
              design="primary"
              type="submit"
              disabled={isSaving}
            >
              <Trans>Send reset instructions</Trans>
            </Button>
          </div>
        </form>
      </Panel>
    );
  };

  renderSuccessMessage = () => (
    <Panel data-marker={this.marker('success-message')()}>
      <Heading size="large" tagName="h1" className={commonStyles.title}>
        <Trans>Reset instructions sent</Trans>
      </Heading>

      <Text color="muted" element="p">
        <Trans>
          Instructions to reset your password have been sent to you. Please
          check your email.
        </Trans>
      </Text>
    </Panel>
  );

  renderContent = () => {
    if (this.props.isPasswordReset) {
      return this.renderSuccessMessage();
    }

    return this.renderForm();
  };

  render() {
    return (
      <Layout>
        {this.renderContent()}

        <Panel>
          <Text
            color="muted"
            align="center"
            element="p"
            className={styles.paragraph}
          >
            <Link href={getRouteUrl('signIn')}>
              <Trans>Log In</Trans>
              &nbsp;⟩
            </Link>
          </Text>
        </Panel>
      </Layout>
    );
  }
}
