// @flow
import * as React from 'react';
import { Form, Input, Button } from '@daonomic/ui';
import { getTranslation } from '~/i18n';
import getMarker from '~/utils/get-marker';

type Props = {|
  amount: number,
  cost: number,
  isBuyButtonVisible?: boolean,
  onChangeAmount(number): void,
  onChangeCost(number): void,
  onBuy(): void,
|};

function getInputNumberValue(input: HTMLInputElement): number {
  return Number(input.value) || 0;
}

export default class ExchangeFormView extends React.Component<Props> {
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

    return (
      <Form.Field style={{ flex: '0 0 auto' }}>
        <Button
          data-marker={this.marker('buy')()}
          htmlType="submit"
          type="primary"
          disabled={this.props.amount === 0}
        >
          {getTranslation('exchange:buy')}
        </Button>
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
              label={getTranslation('exchange:amount')}
              value={String(this.props.amount)}
              onChange={this.handleChangeAmount}
            />
          </Form.Field>

          <Form.Field>
            <Input
              data-marker={this.marker('cost')()}
              type="number"
              label={getTranslation('exchange:cost')}
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
