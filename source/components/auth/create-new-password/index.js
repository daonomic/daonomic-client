// @flow
import * as React from 'react';
import Button from '@daonomic/ui/source/button';
import Input from '@daonomic/ui/source/input';
import Panel from '@daonomic/ui/source/panel';
import Text from '@daonomic/ui/source/text';
import Translation from '~/components/translation';
import Heading from '~/components/heading';
import Link from '~/components/link';
import Layout from '../layout';
import commonStyles from '../common.css';

type Props = {
  isSaving?: boolean,
  isNewPasswordCreated?: boolean,
  password?: string,
  confirmationPassword?: string,
  errors?: {
    password?: string,
    confirmationPassword?: string,
    common?: string,
  },
  onChangePassword: (event: Event) => void,
  onChangeConfirmedPassword: (event: Event) => void,
  onSubmit: (event: Event) => void,
};

export default class CreateNewPassword extends React.PureComponent<Props, {}> {
  static defaultProps = {
    password: '',
    confirmationPassword: '',
  };

  renderCommonError = () => {
    const { common } = this.props.errors || {};

    if (common) {
      return (
        <div className={commonStyles.row}>
          <p className={commonStyles.error}>{common}</p>
        </div>
      );
    }

    return null;
  };

  renderForm = () => {
    const {
      onSubmit,
      isSaving,
      onChangePassword,
      onChangeConfirmedPassword,
      password,
      confirmationPassword,
      errors,
    } = this.props;

    return (
      <Panel paddingSize="large">
        <form onSubmit={onSubmit}>
          <Heading size="large" tagName="h1" className={commonStyles.title}>
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
              errors={(errors || {}).password}
              onChange={onChangePassword}
              disabled={isSaving}
            />
          </div>

          <div className={commonStyles.row}>
            <Input
              required
              value={confirmationPassword}
              type="password"
              label={Translation.text('auth:confirmNewPassword')}
              errors={(errors || {}).confirmationPassword}
              onChange={onChangeConfirmedPassword}
              disabled={isSaving}
            />
          </div>

          <div className={commonStyles.footer}>
            <Button type="submit" disabled={isSaving}>
              <Translation id="auth:submitNewPassword" />
            </Button>
          </div>
        </form>
      </Panel>
    );
  };

  renderSuccessMessage = () => (
    <Panel paddingSize="large">
      <Heading size="large" tagName="h1" className={commonStyles.title}>
        <Translation id="auth:createNewPasswordTitle" />
      </Heading>

      <Text isMuted element="p">
        <Translation id="auth:successfulNewPasswordCreation" />
      </Text>
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

      <Panel>
        <Text isMuted align="center" element="p">
          <Translation id="auth:alreadyHaveAccount" />{' '}
          <Link href="/sign/in">
            <Translation id="auth:signInHeading" />&nbsp;⟩
          </Link>
        </Text>
      </Panel>
    </Layout>
  );
}
