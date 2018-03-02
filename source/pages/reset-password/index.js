import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import ResetPassword from '~/components/auth/reset-password';

@inject(({ auth }) => ({
  resetPassword: auth.resetPassword,
  isSaving: auth.isLoading,
  errors: auth.errors,
  isPasswordReset: auth.isPasswordReset,
}))
@observer
class ResetPasswordPage extends Component {
  static propTypes = {
    resetPassword: PropTypes.func.isRequired,
    isPasswordReset: PropTypes.bool.isRequired,
    errors: PropTypes.shape({
      email: PropTypes.string,
      common: PropTypes.string,
    }).isRequired,
    isSaving: PropTypes.bool.isRequired,
  };

  @action
  setEmail = (email) => {
    this.email = email;
  };

  @observable email;

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.resetPassword({ email: this.email });
  };

  handleChangeEmail = (event) => {
    this.setEmail(event.target.value);
  };

  render() {
    const { isSaving, errors, isPasswordReset } = this.props;

    return (
      <ResetPassword
        onSubmit={this.handleSubmit}
        onChangeEmail={this.handleChangeEmail}
        isSaving={isSaving}
        errors={errors}
        email={this.email}
        isPasswordReset={isPasswordReset}
      />
    );
  }
}

export default ResetPasswordPage;
