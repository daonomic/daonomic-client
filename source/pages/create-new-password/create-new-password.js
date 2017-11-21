import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import CreateNewPassword from '~/components/auth/create-new-password';

@inject(({ auth }) => ({
  createNewPassword: auth.createNewPassword,
  isSaving: auth.isLoading,
  errors: auth.errors,
  isNewPasswordCreated: auth.isNewPasswordCreated,
}))
@observer
class CreateNewPasswordPage extends Component {
  static propTypes = {
    createNewPassword: PropTypes.func.isRequired,
    isNewPasswordCreated: PropTypes.bool.isRequired,
    errors: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
      common: PropTypes.string,
    }).isRequired,
    isSaving: PropTypes.bool.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  };

  @action setPassword = (password) => {
    this.password = password;
  };

  @action setConfirmedPassword = (password) => {
    this.confirmedPassword = password;
  };

  @observable password;
  @observable confirmedPassword;

  handleSubmit = (event) => {
    event.preventDefault();

    const { token } = this.props.match.params;

    this.props.createNewPassword({
      token,
      password: this.password,
      confirmedPassword: this.confirmedPassword,
    });
  };

  handleChangePassword = (event) => {
    this.setPassword(event.target.value);
  };

  handleChangeConfirmedPassword = (event) => {
    this.setConfirmedPassword(event.target.value);
  };

  render() {
    const {
      isSaving,
      errors,
      isNewPasswordCreated,
    } = this.props;

    return (
      <CreateNewPassword
        onSubmit={this.handleSubmit}
        onChangePassword={this.handleChangePassword}
        onChangeConfirmedPassword={this.handleChangeConfirmedPassword}
        isNewPasswordCreated={isNewPasswordCreated}
        isSaving={isSaving}
        errors={errors}
        password={this.password}
        confirmedPassword={this.confirmedPassword}
      />
    );
  }
}

export default CreateNewPasswordPage;
