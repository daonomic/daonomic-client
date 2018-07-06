// @flow
import * as React from 'react';
import { Input } from '@daonomic/ui';

type Props = {|
  type: string,
  disabled: boolean,
  required: boolean,
  label: string,
  value: string,
  rawErrors: string[],
  onChange: (string) => void,
|};

export class BaseTextarea extends React.Component<Props> {
  render() {
    return (
      <Input
        element="textarea"
        disabled={this.props.disabled}
        required={this.props.required}
        label={`${this.props.label}${this.props.required ? '*' : ''}`}
        value={String(this.props.value || '')}
        errors={this.props.rawErrors}
        onChange={(event) => this.props.onChange(event.target.value)}
      />
    );
  }
}
