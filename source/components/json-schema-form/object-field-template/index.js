// @flow
import * as React from 'react';
import { Form } from '@daonomic/ui';
import { FieldDescription } from '~/components/json-schema-form/field-description';
import styles from './styles.css';

type Props = {
  children: React.Node,
  required: boolean,
  properties: { content: React.Node }[],
  schema: {
    type: string,
    title?: string,
    description?: string,
  },
  uiSchema: {
    'ui:title'?: string,
    'ui:widget'?: string,
    'ui:inline'?: boolean,
  },
};

export class ObjectFieldTemplate extends React.Component<Props> {
  renderLegend = () => {
    if (!this.props.uiSchema['ui:title'] && !this.props.schema.title) {
      return null;
    }

    return (
      <legend className={styles.legend}>
        {this.props.schema.title || this.props.uiSchema['ui:title']}
        {this.props.required ? '*' : ''}
      </legend>
    );
  };

  renderDescription = () => {
    if (!this.props.schema.description) {
      return null;
    }

    return <FieldDescription>{this.props.schema.description}</FieldDescription>;
  };

  render() {
    if (this.props.uiSchema['ui:widget'] === 'hidden') {
      return this.props.children;
    }

    let content = this.props.properties.map((property) => property.content);

    if (this.props.uiSchema['ui:inline']) {
      content = <Form.Group>{content}</Form.Group>;
    }

    return (
      <fieldset className={styles.fieldset}>
        <header className={styles.header}>
          {this.renderLegend()}
          {this.renderDescription()}
        </header>
        {content}
      </fieldset>
    );
  }
}
