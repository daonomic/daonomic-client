// @flow
import * as React from 'react';
import { Form, Input, Button } from 'antd';
import { getTranslation } from '~/i18n';
import getMarker from '~/utils/get-marker';
import styles from './styles.css';

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
      <div className={styles.row}>
        <Button
          data-marker={this.marker('buy')()}
          htmlType="submit"
          type="primary"
          disabled={this.props.amount === 0}
        >
          {getTranslation('exchange:buy')}
        </Button>
      </div>
    );
  };

  render() {
    return (
      <Form
        data-marker={this.marker()}
        className={styles.form}
        onSubmit={this.handleSubmit}
      >
        <div className={styles.row}>
          <Input
            data-marker={this.marker('amount')()}
            type="number"
            addonBefore={getTranslation('exchange:amount')}
            value={String(this.props.amount)}
            onChange={this.handleChangeAmount}
          />
        </div>

        <div className={styles.row}>
          <Input
            data-marker={this.marker('cost')()}
            type="number"
            addonBefore={getTranslation('exchange:cost')}
            value={String(this.props.cost)}
            onChange={this.handleChangeCost}
          />
        </div>

        {this.renderSubmitButton()}
      </Form>
    );
  }
}
