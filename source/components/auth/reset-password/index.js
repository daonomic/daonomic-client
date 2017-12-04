import React, { PureComponent } from 'react';
import Link from '~/components/link';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Button from 'daonomic-ui/source/button';
import Input from 'daonomic-ui/source/input';
import Translation from '~/components/translation';
import Panel from 'daonomic-ui/source/panel';
import Heading from '~/components/heading';
import textStyles from '~/components/text/text.css';
import Layout from '../layout';
import commonStyles from '../common.css';

export default class ResetPassword extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isSaving: PropTypes.bool,
    isPasswordReset: PropTypes.bool,
    onChangeEmail: PropTypes.func,
    email: PropTypes.string,
    errors: PropTypes.shape({
      email: PropTypes.string,
      common: PropTypes.string,
    }),
  };

  static defaultProps = {
    email: '',
    errors: {},
    onChangeEmail: () => {},
    isPasswordReset: false,
    isSaving: false,
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

  renderForm = () => {
    const {
      onSubmit,
      isSaving,
      onChangeEmail,
      email,
      errors,
    } = this.props;

    return (
      <Panel paddingSize="large">
        <form onSubmit={onSubmit}>
          <Heading size={Heading.sizes.large} tagName="h1" className={commonStyles.title}>
            <Translation id="auth:forgotPassword" />
          </Heading>

          <p className={cn(textStyles.muted, commonStyles.row)}>
            <Translation id="auth:forgotPasswordInstruction" />
          </p>

          <p className={cn(textStyles.muted, commonStyles.row)}>
            <Translation id="auth:forgotPasswordSecurity" />
          </p>

          {this.renderCommonError()}

          <div className={commonStyles.row}>
            <Input
              required
              value={email}
              type="email"
              label={Translation.text('auth:email')}
              error={errors.email}
              onChange={onChangeEmail}
              disabled={isSaving}
            />
          </div>

          <div className={commonStyles.footer}>
            <Button disabled={isSaving}>
              <Translation id="auth:forgotPasswordSubmit" />
            </Button>
          </div>
        </form>
      </Panel>
    );
  };

  renderSuccessMessage = () => (
    <Panel paddingSize="large">
      <Heading size={Heading.sizes.large} tagName="h1" className={commonStyles.title}>
        <Translation id="auth:successfulResetTitle" />
      </Heading>
      <p className={textStyles.muted}>
        <Translation id="auth:successfulResetAnnotation" />
      </p>
    </Panel>
  );

  renderContent = () => {
    if (this.props.isPasswordReset) {
      return this.renderSuccessMessage();
    }

    return this.renderForm();
  };

  render = () => (
    <Layout>
      {this.renderContent()}

      <Panel className={cn(textStyles.muted, textStyles.center)}>
        <Link href="/sign/in">
          <Translation id="auth:signInHeading" />&nbsp;⟩
        </Link>
      </Panel>
    </Layout>
  );
}
