import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import Button from '@daonomic/ui/source/button';
import Input from '@daonomic/ui/source/input';
import Select from '@daonomic/ui/source/select';
import Panel from '@daonomic/ui/source/panel';
import FileUploader from '~/components/file-uploader';
import Checkbox from '@daonomic/ui/source/checkbox';
import Translation from '~/components/translation';
import Heading from '~/components/heading';
import styles from './ethereum-wallet.css';

@inject(({ kyc }) => ({
  isKycEnabled: kyc.isEnabled,
  kycForm: kyc.form,
  address: kyc.formData.get('address'),
  error: kyc.formErrors.get('address'),
  isSaving: kyc.isSaving,
  isSaved: kyc.isSaved,
  onChangeAddress: (value) => kyc.updateFormField('address', value),
  onChangeKycFormField: kyc.updateFormField,
  onSave: kyc.saveData,
}))
@observer
export default class EthereumWallet extends Component {
  static propTypes = {
    isKycEnabled: PropTypes.bool.isRequired,
    kycForm: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, MobxPropTypes.arrayOrObservableArray]),
      error: PropTypes.string,
      values: MobxPropTypes.arrayOrObservableArrayOf(PropTypes.string),
    })),
    address: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isSaved: PropTypes.bool.isRequired,
    onChangeAddress: PropTypes.func.isRequired,
    onChangeKycFormField: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  handleChangeAddress = (event) => {
    this.props.onChangeAddress(event.target.value);
  };

  handleChangeKycField = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.props.onChangeKycFormField(name, value);
  };

  renderHeading = (translationKey) => (
    <Heading
      className={styles.title}
      tagName="h2"
      size={Heading.sizes.normal}
    >
      <Translation id={translationKey} />
    </Heading>
  );

  renderWalletAddress = () => {
    const {
      address,
      error,
    } = this.props;

    return (
      <Fragment>
        <p className={styles.paragraph}>
          <Translation
            id="wallet:annotation"
            data={{
              tokenName: Translation.text('tokenName'),
            }}
          />
        </p>

        <Input
          label={Translation.text('wallet:ethereumAddress')}
          value={address}
          error={error}
          onChange={this.handleChangeAddress}
        />
      </Fragment>
    );
  };

  renderKycForm = () => {
    const { kycForm } = this.props;

    return (
      <Fragment>
        {this.renderHeading('wallet:kycTitle')}
        {kycForm.map(this.renderKycField)}
        {this.renderWalletAddress()}
        {this.renderFooter()}
      </Fragment>
    );
  };

  renderKycField = (field) => {
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
        {content}
      </div>
    );
  };

  renderFooter = () => {
    const {
      address,
      isSaving,
      isSaved,
      onSave,
    } = this.props;
    const isSaveDisabled = address.trim() === '' || isSaving || isSaved;

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

  renderSimpleForm = () => (
    <Fragment>
      {this.renderHeading('wallet:title')}
      {this.renderWalletAddress()}
      {this.renderFooter()}
    </Fragment>
  );

  render() {
    const { isKycEnabled } = this.props;

    return (
      <Panel paddingSize="large">
        {isKycEnabled ? this.renderKycForm() : this.renderSimpleForm()}
      </Panel>
    );
  }
}
