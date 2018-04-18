// @flow
import * as React from 'react';
import { Button, Input, Panel, Text } from '@daonomic/ui';
import Translation from '~/components/translation';
import Heading from '~/components/heading';
import Link from '~/components/link';
import getMarker from '~/utils/get-marker';
import Layout from '../layout';
import commonStyles from '../common.css';

type Props = {|
  email: string,
  errors: {|
    common: string[],
    email: string[],
  |},
  isLoading: boolean,
  isRegistered: boolean,
  onSubmit: Function,
  onChangeEmail: Function,
|};

export default class SignUp extends React.Component<Props> {
  static defaultProps = {
    email: '',
  };

  marker = getMarker('sign-up');

  renderCommonError = () => {
    const { common, email } = this.props.errors;
    const errors = common.concat(email);

    if (errors.length === 0) {
      return null;
    }

    return (
      <div className={commonStyles.row}>
        <div
          className={commonStyles.error}
          data-marker={this.marker('error')()}
        >
          {errors.map((error) => <div key={error}>{error}</div>)}
        </div>
      </div>
    );
  };

  renderForm = () => {
    const {
      isLoading,
      email,
      onSubmit,
      onChangeEmail,
      isRegistered,
    } = this.props;

    if (isRegistered) {
      return null;
    }

    return (
      <form data-marker={this.marker('form')()} onSubmit={onSubmit}>
        <div className={commonStyles.row}>
          <Input
            data-marker={this.marker('email')()}
            required
            value={email}
            type="email"
            label={Translation.text('auth:email')}
            onChange={onChangeEmail}
            disabled={isLoading}
          />
        </div>

        <div className={commonStyles.footer}>
          <Button
            data-marker={this.marker('submit')()}
            type="submit"
            disabled={isLoading}
          >
            <Translation id="auth:signUpSubmit" />
          </Button>
        </div>
      </form>
    );
  };

  renderSuccessMessage = () => {
    const { isRegistered } = this.props;

    if (!isRegistered) {
      return null;
    }

    return (
      <Text data-marker={this.marker('success-message')()} isMuted element="p">
        <Translation id="auth:signUpSuccess" />
      </Text>
    );
  };

  render = () => (
    <Layout>
      <Panel>
        <Heading size="large" tagName="h1" className={commonStyles.title}>
          <Translation id="auth:signUpHeading" />
        </Heading>

        {this.renderCommonError()}
        {this.renderForm()}
        {this.renderSuccessMessage()}
      </Panel>

      <Panel>
        <Text isMuted align="center" element="p">
          <Translation id="auth:alreadyHaveAccount" />{' '}
          <Link data-marker={this.marker('sign-in-link')()} href="/sign/in">
            <Translation id="auth:signInHeading" />&nbsp;⟩
          </Link>
        </Text>
      </Panel>
    </Layout>
  );
}
