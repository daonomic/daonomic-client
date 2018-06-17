// @flow
import * as React from 'react';
import { Form, FieldHint, Button, Input } from '@daonomic/ui';
import { getTranslation } from '~/i18n';
import { ExternalSelect } from '~/components/external-select';
import getMarker from '~/utils/get-marker';
import { baseApiUrl } from '~/config/api';

import type { Address, Country } from '~/modules/user-data/types';

export type Props = {|
  initialAddress?: ?Address,
  isDisabled?: boolean,
  errors: {
    address: ?(string[]),
    country: ?(string[]),
  },

  address: Address,
  onChangeAddress(Address): void,

  confirmationAddress: Address,
  onChangeConfirmationAddress(Address): void,

  country: Country,
  onChangeCountry(Country): void,

  onSubmit(): mixed,
|};

export class UserDataForm extends React.Component<Props> {
  marker = getMarker('user-wallet-address-form');

  handleChangeAddress = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.onChangeAddress(event.target.value);
  };

  handleChangeConfirmationAddress = (
    event: SyntheticInputEvent<HTMLInputElement>,
  ) => {
    this.props.onChangeConfirmationAddress(event.target.value);
  };

  handleChangeCountry = (event: SyntheticInputEvent<HTMLSelectElement>) => {
    this.props.onChangeCountry(event.target.value);
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.props.onSubmit();
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
            errors={this.props.errors.address}
            value={this.props.address}
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
            value={this.props.confirmationAddress}
            onChange={this.handleChangeConfirmationAddress}
          />
          <FieldHint>{getTranslation('kyc:addressConfirmationHint')}</FieldHint>
        </Form.Field>

        <Form.Field>
          <ExternalSelect
            data-marker={this.marker('residency')()}
            required
            optionsUrl={`${baseApiUrl}/countries`}
            label="Your residency"
            placeholder="Select residency"
            errors={this.props.errors.country}
            value={this.props.country}
            onChange={this.handleChangeCountry}
          />
        </Form.Field>

        <Form.Field>
          <Button
            data-marker={this.marker('submit')()}
            design="primary"
            type="submit"
            disabled={
              this.props.address !== this.props.confirmationAddress ||
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
