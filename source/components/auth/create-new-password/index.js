// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Button, Input, Panel, Text } from '@daonomic/ui';
import { Heading } from '~/components/heading';
import { Link } from '~/components/link';
import Layout from '../layout';
import { getMarker } from '~/utils/get-marker';
import commonStyles from '../common.css';
import { getRouteUrl } from '~/domains/app/router';
import styles from './styles.css';

type Props = {|
  password: string,
  confirmedPassword: string,
  errors: {|
    password: string[],
    confirmedPassword: string[],
    common: string[],
  |},
  isSaving: boolean,
  isNewPasswordCreated: boolean,
  onChangePassword: Function,
  onChangeConfirmedPassword: Function,
  onSubmit: Function,
|};

export default class CreateNewPassword extends React.Component<Props> {
  marker = getMarker('create-new-password');

  renderCommonError = () => {
    const { common } = this.props.errors;

    if (common.length === 0) {
      return null;
    }

    return (
      <div className={commonStyles.row}>
        <div
          data-marker={this.marker('error')()}
          className={commonStyles.error}
        >
          {common.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      </div>
    );
  };

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
      <Panel>
        <form data-marker={this.marker('form')()} onSubmit={onSubmit}>
          <Heading size="large" tagName="h1" className={commonStyles.title}>
            <Trans>Create new password</Trans>
          </Heading>

          {this.renderCommonError()}

          <div className={commonStyles.row}>
            <Input
              data-marker={this.marker('password')()}
              required
              value={password}
              type="password"
              autoComplete="new-password"
              label={<Trans>New password</Trans>}
              errors={errors.password}
              onChange={onChangePassword}
              disabled={isSaving}
            />
          </div>

          <div className={commonStyles.row}>
            <Input
              data-marker={this.marker('password2')()}
              required
              value={confirmedPassword}
              type="password"
              label={<Trans>Confirm new password</Trans>}
              errors={errors.confirmedPassword}
              onChange={onChangeConfirmedPassword}
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
              <Trans>Create new password</Trans>
            </Button>
          </div>
        </form>
      </Panel>
    );
  };

  renderSuccessMessage = () => (
    <Panel data-marker={this.marker('success-message')()}>
      <Heading size="large" tagName="h1" className={commonStyles.title}>
        <Trans>Create new password</Trans>
      </Heading>

      <Text color="muted" element="p">
        <Trans>New password have been created</Trans>
      </Text>
    </Panel>
  );

  renderContent = () => {
    if (this.props.isNewPasswordCreated) {
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
            element="p"
            align="center"
            className={styles.paragraph}
          >
            <Trans>Already have an account?</Trans>{' '}
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
