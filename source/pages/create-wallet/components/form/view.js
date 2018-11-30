//@flow
import * as React from 'react';
import { Button, Input } from '@daonomic/ui';
import { CriteriaList } from '~/components/criteria-list';
import styles from './styles.css';

export type Props = {|
  isLoading: boolean,
  progress: number,
  onSave(string): mixed,
|};

type State = {|
  password: string,
  passwordConfirmation: string,
  passwordConfirmationErrors: string[],
|};

export class CreateWalletForm extends React.Component<Props, State> {
  state = {
    password: '',
    passwordConfirmation: '',
    passwordConfirmationErrors: [],
  };

  handleChangePassword = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      password: event.target.value,
      passwordConfirmationErrors: [],
    });
  };

  handleChangePasswordConfirmation = (
    event: SyntheticInputEvent<HTMLInputElement>,
  ) => {
    this.setState({
      passwordConfirmation: event.target.value,
      passwordConfirmationErrors: [],
    });
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();

    const isValid = this.validate();

    if (!isValid) {
      return;
    }

    this.props.onSave(this.state.password);
  };

  validate = () => {
    if (this.state.password !== this.state.passwordConfirmation) {
      this.setState({
        passwordConfirmationErrors: ['Passwords should match'],
      });

      return false;
    }

    return true;
  };

  render() {
    return (
      <form
        autoComplete="off"
        className={styles.form}
        onSubmit={this.handleSubmit}
      >
        <div className={styles.row}>
          <Input
            required
            autoComplete="new-password"
            minLength="6"
            label="Password"
            type="password"
            disabled={this.props.isLoading}
            value={this.state.password}
            onChange={this.handleChangePassword}
          />
        </div>

        <div className={styles.row}>
          <Input
            required
            autoComplete="new-password"
            minLength="6"
            label="Password confirmation"
            type="password"
            disabled={this.props.isLoading}
            value={this.state.passwordConfirmation}
            errors={this.state.passwordConfirmationErrors}
            onChange={this.handleChangePasswordConfirmation}
          />
        </div>

        <CriteriaList className={styles.row}>
          <CriteriaList.Item isMet={this.state.password.length >= 6}>
            6 characters minimum
          </CriteriaList.Item>

          <CriteriaList.Item
            isMet={
              this.state.password !== '' &&
              this.state.password === this.state.passwordConfirmation
            }
          >
            Passwords should match
          </CriteriaList.Item>
        </CriteriaList>

        <p className={styles.row}>
          Do NOT forget to save this password! It encrypts your private key.
          This does not act as a seed to generate your keys. You will need this
          password + your private key to unlock your wallet.
        </p>

        <div className={styles.row}>
          <Button
            design="primary"
            type="submit"
            disabled={this.props.isLoading}
          >
            {this.props.isLoading
              ? `${Math.round(this.props.progress * 100)}%`
              : 'Create New Wallet'}
          </Button>
        </div>
      </form>
    );
  }
}
