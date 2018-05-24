// @flow
import * as React from 'react';
import { Form, Input } from '@daonomic/ui';

type Props = {|
  amount: number,
  cost: number,
  onChangeAmount(number): void,
  onChangeCost(number): void,
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

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Field>
            <Input
              type="number"
              label="Amount"
              value={this.props.amount}
              onChange={this.handleChangeAmount}
            />
          </Form.Field>

          <Form.Field>
            <Input
              type="number"
              label="Cost"
              value={this.props.cost}
              onChange={this.handleChangeCost}
            />
          </Form.Field>
        </Form.Group>
      </Form>
    );
  }
}
