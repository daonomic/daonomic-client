// @flow
import * as React from 'react';
import { Button, Input, Panel, Text } from '@daonomic/ui';
import Translation from '~/components/translation';
import Heading from '~/components/heading';
import Link from '~/components/link';
import Layout from '../layout';
import commonStyles from '../common.css';
import styles from './signin.css';

type Props = {
  password?: string,
  email?: string,
  errors: {
    email: string,
    password: string,
    common: string,
  },
  isLoading: boolean,
  onSubmit: (event: Event) => void,
  onChangeEmail: (event: Event) => void,
  onChangePassword: (event: Event) => void,
};

export default class SignIn extends React.Component<Props, {}> {
  static defaultProps = {
    email: '',
    password: '',
  };

  renderCommonError = () => {
    const { common } = this.props.errors;

    if (common) {
      return (
        <div className={commonStyles.row}>
          <p className={commonStyles.error}>{common}</p>
        </div>
      );
    }

    return null;
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
          <form onSubmit={onSubmit}>
            <Heading size="large" tagName="h1" className={commonStyles.title}>
              <Translation id="auth:signInHeading" />
            </Heading>

            {this.renderCommonError()}

            <div className={commonStyles.row}>
              <Input
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
              <Button type="submit" disabled={isLoading}>
                <Translation id="auth:signInSubmit" />
              </Button>

              <Link href="/sign/reset-password" className={styles.link}>
                <Translation id="auth:forgotPassword" />
              </Link>
            </div>
          </form>
        </Panel>

        <Panel>
          <Text isMuted align="center" element="p">
            <Translation id="auth:dontHaveAccount" />{' '}
            <Link href="/sign/up">
              <Translation id="auth:signUpHeading" />&nbsp;⟩
            </Link>
          </Text>
        </Panel>
      </Layout>
    );
  }
}
