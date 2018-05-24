// @flow
import * as React from 'react';
import { Form, Input, Button } from '@daonomic/ui';
import { getTranslation } from '~/i18n';

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
      <Form.Field>
        <Button type="submit" disabled={this.props.amount === 0}>
          {getTranslation('exchange:buy')}
        </Button>
      </Form.Field>
    );
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Field>
            <Input
              type="number"
              label={getTranslation('exchange:amount')}
              value={String(this.props.amount)}
              onChange={this.handleChangeAmount}
            />
          </Form.Field>

          <Form.Field>
            <Input
              type="number"
              label={getTranslation('exchange:cost')}
              value={String(this.props.cost)}
              onChange={this.handleChangeCost}
            />
          </Form.Field>
        </Form.Group>

        {this.renderSubmitButton()}
      </Form>
    );
  }
}
