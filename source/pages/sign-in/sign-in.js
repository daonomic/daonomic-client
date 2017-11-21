import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import SignIn from '~/components/auth/signin';

@inject(({ auth }) => ({
  login: auth.login,
  errors: auth.errors,
  isLoading: auth.isLoading,
  resetErrors: auth.resetErrors,
}))
@observer
export default class SignInPage extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    resetErrors: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
    errors: PropTypes.shape({
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      common: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      state: PropTypes.object,
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    resetErrors: () => {},
  };

  state = {
    redirectToReferrer: false,
  }

  componentWillMount() {
    this.props.resetErrors();
  }

  @action setEmail = (email) => {
    this.email = email;
  };

  @action setPassword = (password) => {
    this.password = password;
  };

  @observable email;
  @observable password;

  handleChangeEmail = (event) => {
    this.setEmail(event.target.value);
  };

  handleChangePassword = (event) => {
    this.setPassword(event.target.value);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { login } = this.props;

    login({
      email: this.email,
      password: this.password,
    }).then(({ success }) => {
      if (success) {
        this.setState({ redirectToReferrer: true });
      }
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;
    const { isLoading, errors } = this.props;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <SignIn
        email={this.email}
        password={this.password}
        errors={errors}
        isLoading={isLoading}
        onSubmit={this.handleSubmit}
        onChangeEmail={this.handleChangeEmail}
        onChangePassword={this.handleChangePassword}
      />
    );
  }
}
