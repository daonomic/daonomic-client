// @flow
import * as React from 'react';
import { Form, Button, Input, Select, Checkbox } from '@daonomic/ui';
import ImageUploader from '~/components/image-uploader';
import removeDuplicates from '~/utils/remove-duplicates';
import { getTranslation } from '~/i18n';
import getMarker from '~/utils/get-marker';

import type { Field, FieldName, FieldValue } from '~/modules/kyc/types';

export type Props = {|
  form: Field[],
  tokenSymbol: string,
  isDisabled: boolean,
  getFileUrlById(string): string,
  uploadFiles({
    files: File[],
    onUploadProgress: (event: ProgressEvent) => void,
  }): Promise<{}>,
  onChangeField(FieldName, FieldValue): void,
  onSave(): any,
|};

export default class ExtendedKycForm extends React.Component<Props> {
  marker = getMarker('extended-kyc-form');

  handleChangeKycField = (event: { target: HTMLInputElement }) => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.props.onChangeField(name, value);
  };

  handleSave = (event: Event) => {
    event.preventDefault();
    this.props.onSave();
  };

  renderKycField = (field: Field) => {
    const { name, label, value, error, required } = field;
    const { isDisabled } = this.props;
    let content;

    switch (field.type) {
      case 'STRING': {
        if (field.values) {
          const options = field.values.map((optionValue, index) => ({
            id: index,
            value: optionValue,
          }));

          content = (
            <Select
              key={name}
              required={required}
              disabled={isDisabled}
              value={value}
              name={name}
              errors={error}
              onChange={this.handleChangeKycField}
            >
              <option value="" hidden disabled>
                {label}
              </option>

              {options.map(({ id, value: optionValue }) => (
                <option key={id} value={optionValue}>
                  {optionValue}
                </option>
              ))}
            </Select>
          );
        } else {
          content = (
            <Input
              key={name}
              required={required}
              disabled={isDisabled}
              name={name}
              label={label}
              value={value}
              errors={error}
              onChange={this.handleChangeKycField}
            />
          );
        }

        break;
      }

      case 'BOOLEAN': {
        content = (
          <Checkbox
            key={name}
            labelProps={{
              'data-marker': this.marker(name)(),
            }}
            required={required}
            disabled={isDisabled}
            name={name}
            checked={value}
            errors={error}
            label={label}
            onChange={this.handleChangeKycField}
          />
        );

        break;
      }

      case 'FILE': {
        const { getFileUrlById, uploadFiles } = this.props;
        const filesIds: string[] = value instanceof Array ? [...value] : [];

        content = (
          <ImageUploader
            key={name}
            disabled={isDisabled}
            label={label}
            error={error}
            filesIds={filesIds}
            getFileUrlById={getFileUrlById}
            uploadFiles={uploadFiles}
            onAddFiles={(newFilesIds) =>
              this.props.onChangeField(
                name,
                removeDuplicates([...filesIds, ...newFilesIds]),
              )
            }
            onRemoveFile={(removedFileId) =>
              this.props.onChangeField(
                name,
                filesIds.filter((fileId) => fileId !== removedFileId),
              )
            }
          />
        );

        break;
      }

      default: {
        (field: empty);
      }
    }

    return <Form.Field key={name}>{content}</Form.Field>;
  };

  render() {
    return (
      <Form data-marker={this.marker()} onSubmit={this.handleSave}>
        {this.props.form.map(this.renderKycField)}
        <Form.Field>
          <Button
            data-marker={this.marker('submit')()}
            design="primary"
            type="submit"
            disabled={this.props.isDisabled}
          >
            {getTranslation('common:submit')}
          </Button>
        </Form.Field>
      </Form>
    );
  }
}
