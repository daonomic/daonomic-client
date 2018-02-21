// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Button from '@daonomic/ui/source/button';
import Input from '@daonomic/ui/source/input';
import Select from '@daonomic/ui/source/select';
import Panel from '@daonomic/ui/source/panel';
import ImageUploader from '~/components/image-uploader';
import Checkbox from '@daonomic/ui/source/checkbox';
import Translation from '~/components/translation';
import Heading from '~/components/heading';
import removeDuplicates from '~/utils/remove-duplicates';
import kycStore from '~/stores/kyc';
import type {
  KycFormField,
  KycFormFieldName,
  KycFormFieldValue,
} from '~/types/kyc';
import styles from './kyc.css';

type ExtendedKycFormField = KycFormField & {
  value: KycFormFieldValue,
  error: string
};

type Props = {
  isKycEnabled: boolean,
  kycForm: ExtendedKycFormField[],
  isSaving: boolean,
  isSaved: boolean,
  isAllowed: boolean,
  isDenied: boolean,
  denialReason: string,
  getFileUrlById: (id: string) => string,
  uploadFiles: typeof kycStore.uploadFiles,
  onChangeKycFormField: (
    name: KycFormFieldName,
    value: KycFormFieldValue
  ) => void,
  onSave: () => void
};

@inject(({ kyc }: { kyc: typeof kycStore }) => ({
  isLoaded: kyc.isLoaded,
  isKycEnabled: kyc.isEnabled,
  kycForm: kyc.form,
  isSaving: kyc.isSaving,
  isSaved: kyc.isSaved,
  isAllowed: kyc.isAllowed,
  isDenied: kyc.isDenied,
  denialReason: kyc.denialReason,
  getFileUrlById: kyc.getFileUrlById,
  uploadFiles: kyc.uploadFiles,
  onChangeKycFormField: kyc.updateFormField,
  onSave: kyc.saveData,
}))
@observer
export default class Kyc extends Component<Props, {}> {
  handleChangeKycField = (event: { target: HTMLInputElement }) => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.props.onChangeKycFormField(name, value);
  };

  renderHeading = (translationKey: string) => (
    <Heading className={styles.title} tagName="h2" size="normal">
      <Translation id={translationKey} />
    </Heading>
  );

  renderStatus = () => {
    const {
      isSaved, isAllowed, isDenied, denialReason,
    } = this.props;
    let content = null;

    if (isAllowed || !isSaved) {
      return null;
    } else if (isDenied) {
      content = <span className={styles.red}>{denialReason}</span>;
    } else {
      content = <Translation id="wallet:kycOnReview" />;
    }

    return <p className={styles.paragraph}>{content}</p>;
  };

  renderKycField = (field: ExtendedKycFormField) => {
    const {
      name, label, value, error, type, values,
    } = field;
    let content;

    if (values) {
      const options = values.map((optionValue, index) => ({
        id: index,
        value: optionValue,
      }));

      content = (
        <Select value={value} name={name} onChange={this.handleChangeKycField}>
          <option value="DEFAULT">Select please</option>

          {options.map(({ id, value: optionValue }) => (
            <option key={id} value={optionValue}>
              {optionValue}
            </option>
          ))}
        </Select>
      );
    } else if (type === 'BOOLEAN') {
      content = (
        <Checkbox
          name={name}
          checked={value}
          error={error}
          label={label}
          onChange={this.handleChangeKycField}
        />
      );
    } else if (type === 'FILE') {
      const { getFileUrlById, uploadFiles } = this.props;
      const filesIds: string[] = value instanceof Array ? [...value] : [];

      content = (
        <ImageUploader
          label={label}
          error={error}
          filesIds={filesIds}
          getFileUrlById={getFileUrlById}
          uploadFiles={uploadFiles}
          onAddFiles={(newFilesIds) =>
            this.props.onChangeKycFormField(
              name,
              removeDuplicates([...filesIds, ...newFilesIds]),
            )
          }
          onRemoveFile={(removedFileId) =>
            this.props.onChangeKycFormField(
              name,
              filesIds.filter((fileId) => fileId !== removedFileId),
            )
          }
        />
      );
    } else {
      content = (
        <Input
          name={name}
          label={label}
          value={value}
          error={error}
          onChange={this.handleChangeKycField}
        />
      );
    }

    return (
      <div key={name} className={styles.paragraph}>
        {this.renderKycFieldAnnotation(field)}
        {content}
      </div>
    );
  };

  renderKycFieldAnnotation = (field: ExtendedKycFormField) => {
    if (field.name === 'address') {
      return (
        <p className={styles.paragraph}>
          <Translation
            id="wallet:annotation"
            data={{
              tokenName: Translation.text('tokenName'),
            }}
          />
        </p>
      );
    }

    return null;
  };

  renderFooter = () => {
    const { isSaving, isSaved, onSave } = this.props;
    const isSaveDisabled =
      isSaving ||
      isSaved ||
      this.props.kycForm.some((field) => field.values && field.value === 'DEFAULT');

    return (
      <div className={styles.footer}>
        <Button disabled={isSaveDisabled} onClick={onSave}>
          {isSaved ? (
            <Translation id="wallet:saved" />
          ) : (
            <Translation id="wallet:save" />
          )}
        </Button>
      </div>
    );
  };

  render() {
    const { kycForm, isKycEnabled } = this.props;

    return (
      <Panel paddingSize="large">
        {this.renderHeading(isKycEnabled ? 'wallet:kycTitle' : 'wallet:title')}
        {this.renderStatus()}
        {kycForm.map(this.renderKycField)}
        {this.renderFooter()}
      </Panel>
    );
  }
}
