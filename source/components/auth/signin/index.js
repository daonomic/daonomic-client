// @flow
import * as React from 'react';
import { Button, Input, Panel, Text } from '@daonomic/ui';
import Translation from '~/components/translation';
import Heading from '~/components/heading';
import Link from '~/components/link';
import getMarker from '~/utils/get-marker';
import Layout from '../layout';
import commonStyles from '../common.css';
import styles from './signin.css';

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

export default class SignIn extends React.Component<Props> {
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
          {(common || []).map((error) => <div key={error}>{error}</div>)}
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
      <Layout>
        <Panel>
          <form data-marker={this.marker('form')()} onSubmit={onSubmit}>
            <Heading size="large" tagName="h1" className={commonStyles.title}>
              <Translation id="auth:signInHeading" />
            </Heading>

            {this.renderCommonError()}

            <div className={commonStyles.row}>
              <Input
                data-marker={this.marker('email')()}
                required
                type="email"
                label={Translation.text('auth:email')}
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
                label={Translation.text('auth:password')}
                value={password}
                errors={errors.password}
                onChange={onChangePassword}
                disabled={isLoading}
              />
            </div>

            <div className={commonStyles.footer}>
              <Button
                type="submit"
                disabled={isLoading}
                data-marker={this.marker('submit')()}
              >
                <Translation id="auth:signInSubmit" />
              </Button>

              <Link
                href="/sign/reset-password"
                className={styles.link}
                data-marker={this.marker('reset-password')()}
              >
                <Translation id="auth:forgotPassword" />
              </Link>
            </div>
          </form>
        </Panel>

        <Panel>
          <Text isMuted align="center" element="p">
            <Translation id="auth:dontHaveAccount" />{' '}
            <Link data-marker={this.marker('sign-up-link')()} href="/sign/up">
              <Translation id="auth:signUpHeading" />&nbsp;⟩
            </Link>
          </Text>
        </Panel>
      </Layout>
    );
  }
}
