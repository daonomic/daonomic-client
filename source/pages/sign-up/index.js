import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import SignUp from '~/components/auth/signup';

@inject(({ auth }) => ({
  register: auth.register,
  errors: auth.errors,
  isRegistered: auth.isRegistered,
  isLoading: auth.isLoading,
}))
@observer
export default class SignUpPage extends React.Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    isRegistered: PropTypes.bool.isRequired,
    errors: PropTypes.shape({
      email: PropTypes.string,
    }).isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  @action
  setEmail = (email) => {
    this.email = email;
  };

  @observable email;

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.register({ email: this.email });
  };

  handleChangeEmail = (event) => {
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
