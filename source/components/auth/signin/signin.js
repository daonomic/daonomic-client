import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Translation from '~/components/translation';
import Panel from '~/components/panel';
import Heading from '~/components/heading';
import Link from '~/components/link';
import Input from '~/components/input';
import Button from '~/components/button';
import textStyles from '~/components/text/text.css';
import Layout from '../layout';
import commonStyles from '../common.css';
import styles from './signin.css';

export default class SignIn extends PureComponent {
  static propTypes = {
    password: PropTypes.string,
    email: PropTypes.string,
    errors: PropTypes.shape({
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      common: PropTypes.string.isRequired,
    }).isRequired,
    isLoading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChangeEmail: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
  };

  static defaultProps = {
    email: '',
    password: '',
  };

  renderCommonError = () => {
    const { common } = this.props.errors;

    if (common) {
      return (
        <div className={commonStyles.row}>
          <p className={commonStyles.error}>
            {common}
          </p>
        </div>
      );
    }

    return null;
  }

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
        <Panel paddingSize={Panel.paddingSizes.large}>
          <form onSubmit={onSubmit}>
            <Heading size={Heading.sizes.large} tagName="h1" className={commonStyles.title}>
              <Translation id="auth:signInHeading" />
            </Heading>

            {this.renderCommonError()}

            <div className={commonStyles.row}>
              <Input
                required
                type="email"
                label={Translation.text('auth:email')}
                value={email}
                error={errors.email}
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
                error={errors.password}
                onChange={onChangePassword}
                disabled={isLoading}
              />
            </div>

            <div className={commonStyles.footer}>
              <Button disabled={isLoading}>
                <Translation id="auth:signInSubmit" />
              </Button>
              <Link href="/sign/reset-password" className={styles.link}>
                <Translation id="auth:forgotPassword" />
              </Link>
            </div>
          </form>
        </Panel>

        <Panel className={cn(textStyles.muted, textStyles.center)}>
          <Translation id="auth:dontHaveAccount" />
          {' '}
          <Link href="/sign/up">
            <Translation id="auth:signUpHeading" />&nbsp;⟩
          </Link>
        </Panel>
      </Layout>
    );
  }
}
