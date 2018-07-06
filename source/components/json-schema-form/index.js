// @flow
import * as React from 'react';
import OriginalJsonSchemaForm from 'react-jsonschema-form';
import { Form, Button } from '@daonomic/ui';
import FieldTemplate from './field-template';
import ObjectFieldTemplate from './object-field-template';
import ArrayFieldTemplate from './array-field-template';
import { BaseInput } from './base-input';
import { BaseTextarea } from './base-textarea';
import { BaseCheckbox } from './base-checkbox';
import { BaseSelect } from './base-select';
import { ExternalSelect } from './external-select';
import { removeEmptyEntries } from './utils/remove-empty-entries';
import { getTranslation } from '~/i18n';

const widgets = {
  BaseInput,
  CheckboxWidget: BaseCheckbox,
  SelectWidget: BaseSelect,
  TextareaWidget: BaseTextarea,
  int64: BaseInput,
  'external-select': ExternalSelect,
};

type Props = {
  children?: React.Node,
  className?: string,
  submitButtonText?: string,
  widgets?: {},
  onChange?: ({ formData: any }) => void,
};

export class JsonSchemaForm extends React.Component<Props> {
  handleChange = ({ formData, ...rest }: { formData: {} }) => {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange({
        ...rest,
        formData: removeEmptyEntries(formData),
      });
    }
  };

  renderContent = () => {
    let { children } = this.props;

    if (!children) {
      children = (
        <Button type="submit" design="primary">
          {this.props.submitButtonText
            ? this.props.submitButtonText
            : getTranslation('common:submit')}
        </Button>
      );
    }

    return <Form.Field>{children}</Form.Field>;
  };

  render() {
    return (
      <Form
        element={OriginalJsonSchemaForm}
        FieldTemplate={FieldTemplate}
        ObjectFieldTemplate={ObjectFieldTemplate}
        ArrayFieldTemplate={ArrayFieldTemplate}
        {...this.props}
        onChange={this.handleChange}
        widgets={{ ...widgets, ...(this.props.widgets || {}) }}
      >
        {this.renderContent()}
      </Form>
    );
  }
}
