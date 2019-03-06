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

export function FieldTemplate(props: Props) {
  if (props.uiSchema['ui:widget'] === 'hidden') {
    return props.children;
  }

  return <Form.Field>{props.children}</Form.Field>;
}
