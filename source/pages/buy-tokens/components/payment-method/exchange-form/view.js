// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans, Plural } from '@lingui/macro';
import { Form, Input, Button } from '@daonomic/ui';
import { getMarker } from '~/utils/get-marker';
import { KyberButton } from '~/components/kyber-button';

type Props = {|
  amount: number,
  cost: number,
  costPrecision: number,
  bonus: ?number,
  isBuyButtonVisible?: boolean,
  isKyber?: boolean,
  onChangeAmount(number): void,
  onChangeCost(number): void,
  onBuy(): void,
|};

function getInputNumberValue(input: HTMLInputElement): number {
  return Number(input.value) || 0;
}

export class ExchangeFormView extends React.Component<Props> {
  marker = getMarker('exchange-form');

  handleChangeAmount = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.onChangeAmount(getInputNumberValue(event.target));
  };

  handleChangeCost = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.onChangeCost(getInputNumberValue(event.target));
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.props.onBuy();
  };

  renderSubmitButton = () => {
    if (!this.props.isBuyButtonVisible) {
      return null;
    }

    let button = (
      <Button
        data-marker={this.marker('buy')()}
        type="submit"
        disabled={this.props.amount === 0}
      >
        <Trans>Buy</Trans>
      </Button>
    );

    if (this.props.isKyber) {
      button = (
        <KyberButton
          data-marker={this.marker('buy-erc20')()}
          ethAmount={this.props.cost}
          disabled={this.props.cost === 0}
        >
          <Trans>Buy</Trans>
        </KyberButton>
      );
    }

    return (
      <Form.Field withGhostLabel style={{ flex: '0 0 auto' }}>
        {button}
      </Form.Field>
    );
  };

  render() {
    return (
      <Form data-marker={this.marker()} onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Field>
            <Input
              data-marker={this.marker('amount')()}
              type="number"
              step="any"
              min="0"
              description={
                this.props.bonus && (
                  <Plural
                    value={this.props.bonus}
                    one="You will receive # bonus token!"
                    other="You will receive # bonus tokens!"
                  />
                )
              }
              label={<Trans>Amount</Trans>}
              value={String(this.props.amount)}
              onChange={this.handleChangeAmount}
            />
          </Form.Field>

          <Form.Field>
            <Input
              data-marker={this.marker('cost')()}
              type="number"
              min={parseFloat(`0.${'0'.repeat(this.props.costPrecision - 1)}1`)}
              step={parseFloat(
                `0.${'0'.repeat(this.props.costPrecision - 1)}1`,
              )}
              label={<Trans>Cost</Trans>}
              value={String(this.props.cost)}
              onChange={this.handleChangeCost}
            />
          </Form.Field>

          {this.renderSubmitButton()}
        </Form.Group>
      </Form>
    );
  }
}
