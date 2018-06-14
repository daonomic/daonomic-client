// @flow
import * as React from 'react';
import { Form, FieldHint, Button, Input } from '@daonomic/ui';
import { getTranslation } from '~/i18n';
import getMarker from '~/utils/get-marker';

export type Props = {|
  initialAddress?: ?string,
  isDisabled?: boolean,
  onSubmit({ address: string }): mixed,
|};

type State = {|
  address: string,
  confirmationAddress: string,
|};

export default class UserWalletAddressFormView extends React.Component<
  Props,
  State,
> {
  marker = getMarker('user-wallet-address-form');

  state = {
    address: this.props.initialAddress || '',
    confirmationAddress: '',
  };

  handleChangeAddress = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      address: event.target.value,
    });
  };

  handleChangeConfirmationAddress = (
    event: SyntheticInputEvent<HTMLInputElement>,
  ) => {
    this.setState({
      confirmationAddress: event.target.value,
    });
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.props.onSubmit({ address: this.state.address });
  };

  render() {
    const addressPattern = '0x(\\d|[a-zA-Z]){40}';

    return (
      <Form data-marker={this.marker()} onSubmit={this.handleSubmit}>
        <Form.Field>
          <p>
            {getTranslation('kyc:addressAnnotation')}{' '}
            <strong>{getTranslation('kyc:addressWarning')}</strong>
          </p>
        </Form.Field>

        <Form.Field>
          <Input
            data-marker={this.marker('address')()}
            required
            type="text"
            pattern={addressPattern}
            disabled={this.props.isDisabled}
            label={getTranslation('kyc:yourEthereumWalletAddress')}
            value={this.state.address}
            onChange={this.handleChangeAddress}
          />
          <FieldHint>{getTranslation('kyc:addressFieldHint')}</FieldHint>
        </Form.Field>

        <Form.Field>
          <Input
            data-marker={this.marker('confirmation-address')()}
            required
            type="text"
            pattern={addressPattern}
            disabled={this.props.isDisabled}
            label={getTranslation('kyc:yourEthereumWalletAddressConfirmation')}
            value={this.state.confirmationAddress}
            onChange={this.handleChangeConfirmationAddress}
          />
          <FieldHint>{getTranslation('kyc:addressConfirmationHint')}</FieldHint>
        </Form.Field>

        <Form.Field>
          <Button
            data-marker={this.marker('submit')()}
            design="primary"
            type="submit"
            disabled={
              this.state.address !== this.state.confirmationAddress ||
              this.props.isDisabled
            }
          >
            {getTranslation('common:submit')}
          </Button>
        </Form.Field>
      </Form>
    );
  }
}
