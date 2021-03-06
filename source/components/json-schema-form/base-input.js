// @flow
import * as React from 'react';
import MaskedInput from 'react-text-mask';
import { Input } from '@daonomic/ui';
import { UnstyledFieldDescription } from '~/components/json-schema-form/field-description';
import {
  dateUserFormatString,
  dateAutoCorrectPipe,
  fromMachineToUserDate,
  fromUserToMachineDate,
} from './utils/date';
import {
  fromIsoToUserDateTime,
  fromUserToIsoDateTime,
  dateTimeUserFormatString,
  dateTimeAutoCorrectPipe,
} from './utils/date-time';

type Props = {|
  id: string,
  type: string,
  disabled: boolean,
  required: boolean,
  label: string,
  value: string,
  rawErrors: string[],
  schema: {
    pattern: string,
    type: string,
    description?: string,
  },
  onChange: (string) => void,
|};

const maskPlaceholderChar = '_';
const digit = /\d/;

function getDateTimeMask(formatString: string): (RegExp | string)[] {
  return formatString.split('').map((char) => {
    if (['d', 'm', 'y', 'h'].includes(char.toLowerCase())) {
      return digit;
    }

    return char;
  });
}

export class BaseInput extends React.Component<Props> {
  render() {
    const attrs: { [key: string]: mixed } = {
      type: this.props.type || 'text',
      pattern: this.props.schema.pattern || null,
      disabled: this.props.disabled,
      required: this.props.required,
      name: this.props.id,
      label: `${this.props.label}${this.props.required ? '*' : ''}`,
      description: this.props.schema.description ? (
        <UnstyledFieldDescription>
          {this.props.schema.description}
        </UnstyledFieldDescription>
      ) : null,
      value: String(this.props.value || ''),
      errors: this.props.rawErrors,
      onChange: (event) => {
        this.props.onChange(event.target.value);
      },
    };

    if (this.props.type === 'date') {
      attrs.type = 'text';
      attrs.element = MaskedInput;
      attrs.mask = getDateTimeMask(dateUserFormatString);
      attrs.value = fromMachineToUserDate(this.props.value);
      attrs.placeholder = dateUserFormatString;
      attrs.placeholderChar = maskPlaceholderChar;
      attrs.pipe = dateAutoCorrectPipe;
      attrs.onChange = (event) => {
        if (event.target.value.includes(maskPlaceholderChar)) {
          this.props.onChange('');
        } else {
          this.props.onChange(fromUserToMachineDate(event.target.value));
        }
      };
    } else if (this.props.type === 'datetime-local') {
      attrs.type = 'text';
      attrs.element = MaskedInput;
      attrs.value = fromIsoToUserDateTime(this.props.value);
      attrs.mask = getDateTimeMask(dateTimeUserFormatString);
      attrs.placeholder = dateTimeUserFormatString;
      attrs.placeholderChar = maskPlaceholderChar;
      attrs.pipe = dateTimeAutoCorrectPipe;
      attrs.onChange = (event) => {
        if (!event.target.value.includes(maskPlaceholderChar)) {
          this.props.onChange(fromUserToIsoDateTime(event.target.value));
        }
      };
    } else if (this.props.schema.type === 'number') {
      attrs.type = 'number';
    }

    return <Input {...attrs} />;
  }
}
