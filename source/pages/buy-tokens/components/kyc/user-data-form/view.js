// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Form, FieldHint, Button, Input } from '@daonomic/ui';
import { ExternalSelect } from '~/components/external-select';
import { getMarker } from '~/utils/get-marker';
import { baseApiUrl } from '~/domains/app/config/api';

import type { Address, Country } from '~/modules/user-data/types';

export type Props = {|
  initialAddress?: ?Address,
  isDisabled?: boolean,
  countryRequired: boolean,
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
            <Trans>
              In order to recieve tokens you need to give your Ethereum Wallet
              Address.
            </Trans>{' '}
            <strong>
              <Trans>Note: address could not be changed after approval!</Trans>
            </strong>
          </p>
        </Form.Field>

        <Form.Field>
          <Input
            data-marker={this.marker('address')()}
            required
            type="text"
            pattern={addressPattern}
            disabled={this.props.isDisabled}
            label={<Trans>Your Ethereum wallet address</Trans>}
            errors={this.props.errors.address}
            value={this.props.address}
            onChange={this.handleChangeAddress}
          />
          <FieldHint>
            <Trans>Starts with 0x, then 40 characters</Trans>
          </FieldHint>
        </Form.Field>

        <Form.Field>
          <Input
            data-marker={this.marker('confirmation-address')()}
            required
            type="text"
            pattern={addressPattern}
            disabled={this.props.isDisabled}
            label={<Trans>Your Ethereum wallet address confirmation</Trans>}
            value={this.props.confirmationAddress}
            onChange={this.handleChangeConfirmationAddress}
          />
          <FieldHint>
            <Trans>Re-enter your address to make sure it is correct</Trans>
          </FieldHint>
        </Form.Field>

        {this.props.countryRequired && (
          <Form.Field>
            <ExternalSelect
              data-marker={this.marker('residency')()}
              required
              optionsUrl={`${baseApiUrl}/countries`}
              label={<Trans>Your residency</Trans>}
              placeholder={<Trans>Select residency</Trans>}
              errors={this.props.errors.country}
              value={this.props.country}
              onChange={this.handleChangeCountry}
            />
          </Form.Field>
        )}

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
            <Trans>Submit</Trans>
          </Button>
        </Form.Field>
      </Form>
    );
  }
}
