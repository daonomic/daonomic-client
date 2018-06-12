// @flow
import * as React from 'react';
import Link from '~/components/link';
import { Button, Input, Panel, Text } from '@daonomic/ui';
import Heading from '~/components/heading';
import Layout from '../layout';
import commonStyles from '../common.css';
import getMarker from '~/utils/get-marker';
import { getRouteUrl } from '~/router';
import { getTranslation } from '~/i18n';
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
            {getTranslation('auth:forgotPassword')}
          </Heading>

          <Text design="muted" element="p" className={commonStyles.row}>
            {getTranslation('auth:forgotPasswordInstruction')}
          </Text>

          <Text design="muted" element="p" className={commonStyles.row}>
            {getTranslation('auth:forgotPasswordSecurity')}
          </Text>

          {this.renderCommonError()}

          <div className={commonStyles.row}>
            <Input
              data-marker={this.marker('email')()}
              required
              value={email}
              type="email"
              label={getTranslation('auth:email')}
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
              {getTranslation('auth:forgotPasswordSubmit')}
            </Button>
          </div>
        </form>
      </Panel>
    );
  };

  renderSuccessMessage = () => (
    <Panel data-marker={this.marker('success-message')()}>
      <Heading size="large" tagName="h1" className={commonStyles.title}>
        {getTranslation('auth:successfulResetTitle')}
      </Heading>

      <Text design="muted" element="p">
        {getTranslation('auth:successfulResetAnnotation')}
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
            design="muted"
            align="center"
            element="p"
            className={styles.paragraph}
          >
            <Link href={getRouteUrl('signIn')}>
              {getTranslation('auth:signInHeading')}&nbsp;⟩
            </Link>
          </Text>
        </Panel>
      </Layout>
    );
  }
}
