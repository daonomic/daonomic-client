// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import OriginalJsonSchemaForm from 'react-jsonschema-form';
import { Form, Button } from '@daonomic/ui';
import { FieldTemplate } from './field-template';
import { ObjectFieldTemplate } from './object-field-template';
import { ArrayFieldTemplate } from './array-field-template';
import { BaseInput } from './base-input';
import { BaseTextarea } from './base-textarea';
import { BaseCheckbox } from './base-checkbox';
import { BaseSelect } from './base-select';
import { ExternalSelect } from './external-select';
import { BaseFile } from './base-file';
import { removeEmptyEntries } from './utils/remove-empty-entries';

const widgets = {
  BaseInput,
  CheckboxWidget: BaseCheckbox,
  SelectWidget: BaseSelect,
  TextareaWidget: BaseTextarea,
  int64: BaseInput,
  'external-select': ExternalSelect,
};

const fields = {
  file: BaseFile,
};

type Props = {
  children?: React.Node,
  className?: string,
  submitButtonText?: string,
  widgets?: {},
  fields?: {},
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
          {this.props.submitButtonText ? (
            this.props.submitButtonText
          ) : (
            <Trans>Submit</Trans>
          )}
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
        fields={{ ...fields, ...(this.props.fields || {}) }}
      >
        {this.renderContent()}
      </Form>
    );
  }
}
