// @flow
import * as React from 'react';
import cn from 'classnames';
import { observer, inject } from 'mobx-react';
import { Button, Input, Select, Panel, Badge, Checkbox } from '@daonomic/ui';
import ImageUploader from '~/components/image-uploader';
import Heading from '~/components/heading';
import removeDuplicates from '~/utils/remove-duplicates';
import styles from './kyc.css';
import { getTranslation } from '~/i18n';

import type { KycStore } from '~/stores/kyc';
import type { SaleStore } from '~/stores/sale';
import type {
  KycFormField,
  KycFormFieldName,
  KycFormFieldValue,
} from '~/types/kyc';

type Props = {|
  tokenSymbol: string,
  isKycExtended: boolean,
  kycForm: KycFormField[],
  isSaving: boolean,
  isSaved: boolean,
  isAllowed: boolean,
  isDenied: boolean,
  isOnReview: boolean,
  isEditingAllowed: boolean,
  denialReason: string,
  getFileUrlById(string): string,
  uploadFiles({
    files: File[],
    onUploadProgress: (event: ProgressEvent) => void,
  }): Promise<{}>,
  onChangeKycFormField(KycFormFieldName, KycFormFieldValue): void,
  onSave(): any,
|};

@observer
class Kyc extends React.Component<Props> {
  handleChangeKycField = (event: { target: HTMLInputElement }) => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.props.onChangeKycFormField(name, value);
  };

  handleSave = (event: Event) => {
    event.preventDefault();

    this.props.onSave();
  };

  renderHeading = (translationKey: string) => (
    <Heading className={styles.title} tagName="h2" size="normal">
      {getTranslation(translationKey)}
    </Heading>
  );

  renderStatus = () => {
    const { isOnReview, isDenied, denialReason } = this.props;

    if (isDenied) {
      return (
        <p className={cn(styles.paragraph, styles.red)}>
          {getTranslation('wallet:kycDenied')}
          <br />
          {denialReason && `Denial reason: ${denialReason}`}
        </p>
      );
    } else if (isOnReview) {
      return (
        <p className={styles.paragraph}>
          {getTranslation('wallet:kycOnReview')}
        </p>
      );
    }
  };

  renderStatusBadge = () => {
    if (this.props.isOnReview) {
      return <Badge color="danger">Waiting for review</Badge>;
    }

    return null;
  };

  renderForm = () => {
    if (this.props.isOnReview) {
      return null;
    }

    return (
      <form onSubmit={this.handleSave}>
        {this.props.kycForm.map(this.renderKycField)}
        {this.renderFooter()}
      </form>
    );
  };

  renderKycField = (field: KycFormField) => {
    const { name, label, value, error, required } = field;
    const { isEditingAllowed } = this.props;
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
              required={required}
              disabled={!isEditingAllowed}
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
              required={required}
              disabled={!isEditingAllowed}
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
            required={required}
            disabled={!isEditingAllowed}
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
            disabled={!isEditingAllowed}
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

        break;
      }

      default: {
        (field: empty);
      }
    }

    return (
      <div key={name} className={styles.paragraph}>
        {this.renderKycFieldAnnotation(field)}
        {content}
      </div>
    );
  };

  renderKycFieldAnnotation = (field: KycFormField) => {
    if (field.name === 'address') {
      return (
        <p className={styles.paragraph}>
          {getTranslation('wallet:addressAnnotation', {
            tokenName: this.props.tokenSymbol,
          })}{' '}
          <strong>{getTranslation('wallet:addressWarning')}</strong>
        </p>
      );
    }

    return null;
  };

  renderFooter = () => {
    const { isSaved, isEditingAllowed } = this.props;

    return (
      <div className={styles.footer}>
        <Button type="submit" disabled={!isEditingAllowed}>
          {isSaved
            ? getTranslation('wallet:saved')
            : getTranslation('wallet:save')}
        </Button>
      </div>
    );
  };

  render() {
    if (this.props.isOnReview || this.props.isAllowed) {
      const addressField = this.props.kycForm.find(
        (field) => field.name === 'address',
      );

      if (!addressField) {
        return null;
      }

      return (
        <Panel>
          {this.renderStatusBadge()}
          {this.renderStatus()}
          <Input
            disabled
            label={addressField.label}
            value={addressField.value}
            onChange={() => {}}
          />
        </Panel>
      );
    }

    return (
      <Panel>
        {this.renderHeading(
          this.props.isKycExtended ? 'wallet:kycTitle' : 'wallet:title',
        )}
        {this.renderStatus()}
        {this.renderForm()}
      </Panel>
    );
  }
}

export default inject(
  ({ kyc, sale }: { kyc: KycStore, sale: SaleStore }): Props => ({
    tokenSymbol: sale.state.tokenSymbol,
    isKycExtended: kyc.isExtended,
    kycForm: kyc.form,
    isSaving: kyc.isSaving,
    isSaved: kyc.isSaved,
    isAllowed: kyc.isAllowed,
    isDenied: kyc.isDenied,
    isOnReview: kyc.isOnReview,
    isEditingAllowed: !kyc.isSaving && !kyc.isOnReview && !kyc.isAllowed,
    denialReason: kyc.state.denialReason,
    getFileUrlById: kyc.getFileUrlById,
    uploadFiles: kyc.uploadFiles,
    onChangeKycFormField: kyc.updateFormField,
    onSave: kyc.saveData,
  }),
)(Kyc);
