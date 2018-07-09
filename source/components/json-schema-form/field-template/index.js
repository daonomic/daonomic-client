// @flow
import * as React from 'react';
import { Form } from '@daonomic/ui';

type Props = {
  children: React.Node,
  label: string,
  schema: {
    type: string,
  },
  uiSchema: {
    'ui:widget'?: string,
  },
};

export default class FieldTemplate extends React.Component<Props> {
  render() {
    if (this.props.uiSchema['ui:widget'] === 'hidden') {
      return this.props.children;
    }

    return <Form.Field>{this.props.children}</Form.Field>;
  }
}
