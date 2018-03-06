// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import SignUp from '~/components/auth/signup';

type Props = {|
  register: ({ email: string }) => void,
  isLoading: boolean,
  isRegistered: boolean,
  errors: {|
    email: string,
  |},
  onReset: () => void,
|};

@observer
class SignUpPage extends React.Component<Props> {
  @action
  setEmail = (email) => {
    this.email = email;
  };

  @observable email;

  componentWillUnmount = () => {
    this.props.onReset();
  };

  handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.register({ email: this.email });
  };

  handleChangeEmail = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setEmail(event.target.value);
  };

  render() {
    const { isLoading, errors: { email: error }, isRegistered } = this.props;

    return (
      <SignUp
        isLoading={isLoading}
        email={this.email}
        error={error}
        isRegistered={isRegistered}
        onChangeEmail={this.handleChangeEmail}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default inject(({ auth }): Props => ({
  register: auth.register,
  errors: auth.errors,
  isRegistered: auth.isRegistered,
  isLoading: auth.isLoading,
  onReset: auth.resetRegistrationData,
}))(SignUpPage);
