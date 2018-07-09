// @flow
import * as React from 'react';
import { Select } from '@daonomic/ui';
import { UnstyledFieldDescription } from '~/components/json-schema-form/field-description';

type Props = {|
  id: string,
  disabled: boolean,
  required: boolean,
  label: string,
  placeholder?: string,
  rawErrors: string[],
  options: {
    enumOptions: {|
      label: string,
      value: string,
    |}[],
  },
  schema: {
    description?: string,
  },
  value: string,
  onChange: (string) => void,
|};

export class BaseSelect extends React.Component<Props> {
  render() {
    return (
      <Select
        name={this.props.id}
        disabled={this.props.disabled}
        required={this.props.required}
        label={`${this.props.label}${this.props.required ? '*' : ''}`}
        description={
          this.props.schema.description ? (
            <UnstyledFieldDescription>
              {this.props.schema.description}
            </UnstyledFieldDescription>
          ) : null
        }
        placeholder={this.props.placeholder || this.props.label}
        value={this.props.value}
        errors={this.props.rawErrors}
        onChange={(event) => this.props.onChange(event.target.value)}
      >
        {this.props.options.enumOptions.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    );
  }
}
