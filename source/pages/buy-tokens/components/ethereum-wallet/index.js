// @flow
import React, { Fragment, Component } from 'react';
import { observer, inject } from 'mobx-react';
import Button from '@daonomic/ui/source/button';
import Input from '@daonomic/ui/source/input';
import Select from '@daonomic/ui/source/select';
import Panel from '@daonomic/ui/source/panel';
import FileUploader from '~/components/file-uploader';
import Checkbox from '@daonomic/ui/source/checkbox';
import Translation from '~/components/translation';
import Heading from '~/components/heading';
import kycStore from '~/stores/kyc';
import type {
  KycFormField,
  KycFormFieldName,
  KycFormFieldValue,
} from '~/types/kyc';
import styles from './ethereum-wallet.css';

type ExtendedKycFormField = KycFormField & {
  value: KycFormFieldValue,
  error: string,
};

type Props = {
  isKycEnabled: boolean,
  kycForm: ExtendedKycFormField[],
  isSaving: boolean,
  isSaved: boolean,
  onChangeKycFormField: (name: KycFormFieldName, value: KycFormFieldValue) => void,
  onSave: () => void,
};

@inject(({ kyc }: { kyc: typeof kycStore }) => ({
  isKycEnabled: kyc.isEnabled,
  kycForm: kyc.form,
  isSaving: kyc.isSaving,
  isSaved: kyc.isSaved,
  onChangeKycFormField: kyc.updateFormField,
  onSave: kyc.saveData,
}))
@observer
export default class EthereumWallet extends Component<Props, {}> {
  handleChangeKycField = (event: { target: HTMLInputElement }) => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.props.onChangeKycFormField(name, value);
  };

  renderHeading = (translationKey: string) => (
    <Heading
      className={styles.title}
      tagName="h2"
      size="normal"
    >
      <Translation id={translationKey} />
    </Heading>
  );

  renderKycField = (field: ExtendedKycFormField) => {
    const {
      name,
      label,
      value,
      error,
      type,
      values,
    } = field;
    let content;

    if (values) {
      content = (
        <Select value={value} name={name} onChange={this.handleChangeKycField}>
          {values.map((fieldValue) => (
            <option key={fieldValue} value={fieldValue}>
              {fieldValue}
            </option>
          ))}
        </Select>
      );
    } else if (type === 'BOOLEAN') {
      content = (
        <Checkbox
          name={name}
          value={value}
          error={error}
          label={label}
          onChange={this.handleChangeKycField}
        />
      );
    } else if (type === 'FILE') {
      content = (
        <Fragment>
          <FileUploader
            label={label}
            error={error}
            onAddFiles={(newFilesIds) => this.props.onChangeKycFormField(name, newFilesIds[0])}
          />
        </Fragment>
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
    const {
      isSaving,
      isSaved,
      onSave,
    } = this.props;
    const isSaveDisabled = isSaving || isSaved;

    return (
      <div className={styles.footer}>
        <Button disabled={isSaveDisabled} onClick={onSave}>
          {isSaved ?
            <Translation id="wallet:saved" />
            :
            <Translation id="wallet:save" />
          }
        </Button>
      </div>
    );
  };

  render() {
    const { kycForm, isKycEnabled } = this.props;

    return (
      <Panel paddingSize="large">
        {this.renderHeading(isKycEnabled ? 'wallet:kycTitle' : 'wallet:title')}
        {kycForm.map(this.renderKycField)}
        {this.renderFooter()}
      </Panel>
    );
  }
}
