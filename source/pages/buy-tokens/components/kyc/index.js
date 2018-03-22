// @flow
import * as React from 'react';
import cn from 'classnames';
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
import { tokenName } from '~/config';
import styles from './kyc.css';
import type { KycStore } from '~/stores/kyc';
import type {
  KycFormField,
  KycFormFieldName,
  KycFormFieldValue,
} from '~/types/kyc';

type Props = {|
  isKycExtended: boolean,
  kycForm: KycFormField[],
  isSaving: boolean,
  isSaved: boolean,
  isAllowed: boolean,
  isDenied: boolean,
  isOnReview: boolean,
  isEditingAllowed: boolean,
  denialReason: string,
  getFileUrlById: (id: string) => string,
  uploadFiles: (params: {
    files: File[],
    onUploadProgress: (event: ProgressEvent) => void,
  }) => Promise<{}>,
  onChangeKycFormField: (
    name: KycFormFieldName,
    value: KycFormFieldValue,
  ) => void,
  onSave: () => void,
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
      <Translation id={translationKey} />
    </Heading>
  );

  renderStatus = () => {
    const { isOnReview, isDenied, denialReason } = this.props;

    if (isDenied) {
      return (
        <p className={cn(styles.paragraph, styles.red)}>
          <Translation id="wallet:kycDenied" />
          <br />
          {denialReason && `Denial reason: ${denialReason}`}
        </p>
      );
    } else if (isOnReview) {
      return (
        <p className={styles.paragraph}>
          <Translation id="wallet:kycOnReview" />
        </p>
      );
    }
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
              error={error}
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
              error={error}
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
            error={error}
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
          <Translation id="wallet:addressAnnotation" data={{ tokenName }} />{' '}
          <strong>
            <Translation id="wallet:addressWarning" />
          </strong>
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
          {isSaved ? (
            <Translation id="wallet:saved" />
          ) : (
            <Translation id="wallet:save" />
          )}
        </Button>
      </div>
    );
  };

  render = () => {
    if (this.props.isAllowed) {
      const addressField = this.props.kycForm.find(
        (field) => field.name === 'address',
      );

      if (!addressField) {
        return null;
      }

      return (
        <Panel paddingSize="large">
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
      <Panel paddingSize="large">
        <form onSubmit={this.handleSave}>
          {this.renderHeading(
            this.props.isKycExtended ? 'wallet:kycTitle' : 'wallet:title',
          )}
          {this.renderStatus()}
          {this.props.kycForm.map(this.renderKycField)}
          {this.renderFooter()}
        </form>
      </Panel>
    );
  };
}

export default inject(({ kyc }: { kyc: KycStore }): Props => ({
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
}))(Kyc);
