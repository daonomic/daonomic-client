// @flow
import * as React from 'react';
import Link from '~/components/link';
import { Button, Input, Panel, Text } from '@daonomic/ui/source';
import Translation from '~/components/translation';
import Heading from '~/components/heading';
import Layout from '../layout';
import commonStyles from '../common.css';
import getMarker from '~/utils/get-marker';

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
          {common.map((error) => <div key={error}>{error}</div>)}
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
            <Translation id="auth:forgotPassword" />
          </Heading>

          <Text isMuted element="p" className={commonStyles.row}>
            <Translation id="auth:forgotPasswordInstruction" />
          </Text>

          <Text isMuted element="p" className={commonStyles.row}>
            <Translation id="auth:forgotPasswordSecurity" />
          </Text>

          {this.renderCommonError()}

          <div className={commonStyles.row}>
            <Input
              data-marker={this.marker('email')()}
              required
              value={email}
              type="email"
              label={Translation.text('auth:email')}
              errors={errors.email}
              onChange={onChangeEmail}
              disabled={isSaving}
            />
          </div>

          <div className={commonStyles.footer}>
            <Button
              data-marker={this.marker('submit')()}
              type="submit"
              disabled={isSaving}
            >
              <Translation id="auth:forgotPasswordSubmit" />
            </Button>
          </div>
        </form>
      </Panel>
    );
  };

  renderSuccessMessage = () => (
    <Panel data-marker={this.marker('success-message')()}>
      <Heading size="large" tagName="h1" className={commonStyles.title}>
        <Translation id="auth:successfulResetTitle" />
      </Heading>

      <Text isMuted element="p">
        <Translation id="auth:successfulResetAnnotation" />
      </Text>
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

      <Panel>
        <Text isMuted align="center" element="p">
          <Link href="/sign/in">
            <Translation id="auth:signInHeading" />&nbsp;⟩
          </Link>
        </Text>
      </Panel>
    </Layout>
  );
}
