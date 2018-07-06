// @flow
import * as React from 'react';
import { Checkbox } from '@daonomic/ui';
import { UnstyledFieldDescription } from '~/components/json-schema-form/field-description';

type Props = {|
  id: string,
  disabled: boolean,
  required: boolean,
  label: string,
  value: boolean,
  rawErrors: string[],
  schema: {
    description?: string,
  },
  onChange: (boolean) => void,
|};

export class BaseCheckbox extends React.Component<Props> {
  render() {
    return (
      <Checkbox
        name={this.props.id}
        labelProps={{
          'data-marker': this.props.id,
        }}
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
        checked={this.props.value || false}
        errors={this.props.rawErrors}
        onChange={(event) => this.props.onChange(event.target.checked)}
      />
    );
  }
}
