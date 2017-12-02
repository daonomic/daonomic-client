import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Button from 'daonomic-ui/source/button';
import Input from 'daonomic-ui/source/input';
import Panel from 'daonomic-ui/source/panel';
import Translation from '~/components/translation';
import Heading from '~/components/heading';
import Link from '~/components/link';
import textStyles from '~/components/text/text.css';
import Layout from '../layout';
import commonStyles from '../common.css';

export default class CreateNewPassword extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isSaving: PropTypes.bool,
    onChangePassword: PropTypes.func,
    onChangeConfirmedPassword: PropTypes.func,
    isNewPasswordCreated: PropTypes.bool,
    password: PropTypes.string,
    confirmedPassword: PropTypes.string,
    errors: PropTypes.shape({
      password: PropTypes.string,
      confirmedPassword: PropTypes.string,
      common: PropTypes.string,
    }),
  };

  static defaultProps = {
    password: '',
    confirmedPassword: '',
    errors: {},
    onChangePassword: () => {},
    onChangeConfirmedPassword: () => {},
    isNewPasswordCreated: false,
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
      onChangePassword,
      onChangeConfirmedPassword,
      password,
      confirmedPassword,
      errors,
    } = this.props;

    return (
      <Panel paddingSize="large">
        <form onSubmit={onSubmit}>
          <Heading size={Heading.sizes.large} tagName="h1" className={commonStyles.title}>
            <Translation id="auth:createNewPasswordTitle" />
          </Heading>

          {this.renderCommonError()}

          <div className={commonStyles.row}>
            <Input
              required
              value={password}
              type="password"
              autoComplete="new-password"
              label={Translation.text('auth:newPassword')}
              error={errors.password}
              onChange={onChangePassword}
              disabled={isSaving}
            />
          </div>

          <div className={commonStyles.row}>
            <Input
              required
              value={confirmedPassword}
              type="password"
              label={Translation.text('auth:confirmNewPassword')}
              error={errors.confirmedPassword}
              onChange={onChangeConfirmedPassword}
              disabled={isSaving}
            />
          </div>

          <div className={commonStyles.footer}>
            <Button disabled={isSaving}>
              <Translation id="auth:submitNewPassword" />
            </Button>
          </div>
        </form>
      </Panel>
    );
  };

  renderSuccessMessage = () => (
    <Panel paddingSize="large">
      <Heading size={Heading.sizes.large} tagName="h1" className={commonStyles.title}>
        <Translation id="auth:createNewPasswordTitle" />
      </Heading>

      <p className={textStyles.muted}>
        <Translation id="auth:successfulNewPasswordCreation" />
      </p>
    </Panel>
  );

  renderContent = () => {
    if (this.props.isNewPasswordCreated) {
      return this.renderSuccessMessage();
    }

    return this.renderForm();
  };

  render = () => (
    <Layout>
      {this.renderContent()}

      <Panel className={cn(textStyles.muted, textStyles.center)}>
        <Translation id="auth:alreadyHaveAccount" />
        {' '}
        <Link href="/sign/in">
          <Translation id="auth:signInHeading" />&nbsp;⟩
        </Link>
      </Panel>
    </Layout>
  );
}
