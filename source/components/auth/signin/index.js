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
import styles from './signin.css';
import { getRouteUrl } from '~/domains/app/router';

type Props = {|
  email: string,
  password: string,
  errors: {|
    email: string[],
    password: string[],
    common: string[],
  |},
  isLoading: boolean,
  onSubmit: Function,
  onChangeEmail: Function,
  onChangePassword: Function,
|};

export class SignIn extends React.Component<Props> {
  marker = getMarker('sign-in');

  renderCommonError = () => {
    const { common } = this.props.errors;

    if (common && common.length === 0) {
      return null;
    }

    return (
      <div className={commonStyles.row}>
        <div
          className={commonStyles.error}
          data-marker={this.marker('error')()}
        >
          {(common || []).map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      </div>
    );
  };

  render() {
    const {
      email,
      password,
      errors,
      onSubmit,
      onChangeEmail,
      onChangePassword,
      isLoading,
    } = this.props;

    return (
      <AuthLayout>
        <Panel>
          <form data-marker={this.marker('form')()} onSubmit={onSubmit}>
            <Heading size="large" tagName="h1" className={commonStyles.title}>
              <Trans id="auth.loginHeading" />
            </Heading>

            {this.renderCommonError()}

            <div className={commonStyles.row}>
              <Input
                data-marker={this.marker('email')()}
                required
                type="email"
                label={<Trans>Email</Trans>}
                value={email}
                errors={errors.email}
                onChange={onChangeEmail}
                disabled={isLoading}
              />
            </div>

            <div className={commonStyles.row}>
              <Input
                data-marker={this.marker('password')()}
                required
                type="password"
                autoComplete="new-password"
                label={<Trans>Password</Trans>}
                value={password}
                errors={errors.password}
                onChange={onChangePassword}
                disabled={isLoading}
              />
            </div>

            <div className={commonStyles.footer}>
              <Button
                type="submit"
                design="primary"
                disabled={isLoading}
                data-marker={this.marker('submit')()}
              >
                <Trans>Log In</Trans>
              </Button>

              <Link
                href={getRouteUrl('resetPassword')}
                className={styles.link}
                data-marker={this.marker('reset-password')()}
              >
                <Trans>Forgot password?</Trans>
              </Link>
            </div>
          </form>
        </Panel>

        <Panel>
          <Text
            color="muted"
            align="center"
            element="p"
            className={styles.paragraph}
          >
            <Trans>Don’t have an account?</Trans>{' '}
            <Link
              data-marker={this.marker('sign-up-link')()}
              href={getRouteUrl('signUp')}
            >
              <Trans>Sign up</Trans>
              &nbsp;⟩
            </Link>
          </Text>
        </Panel>
      </AuthLayout>
    );
  }
}
