// @flow
import * as React from 'react';
import { observable, computed, action, runInAction } from 'mobx';
import { observer, inject } from 'mobx-react';
import ExtendedKycFormView from './view';
import { validateKycForm } from './utils/validation';

import type { KycStore } from '~/stores/kyc';
import type { SaleStore } from '~/stores/sale';
import type {
  BaseKycFormField,
  KycFormField,
  KycFormFieldName,
  KycFormFieldValue,
} from '~/types/kyc';

type Props = {|
  schema: BaseKycFormField[],
  initialFormData: Map<KycFormFieldName, KycFormFieldValue>,
  tokenSymbol: string,
  getFileUrlById(string): string,
  uploadFiles({
    files: File[],
    onUploadProgress: (event: ProgressEvent) => void,
  }): Promise<{}>,
  onSubmit(): Promise<mixed>,
|};

class ExtendedKycForm extends React.Component<Props> {
  @observable
  formData: Map<KycFormFieldName, KycFormFieldValue> = this.props
    .initialFormData;
  @observable formErrors: Map<KycFormFieldName, string> = new Map();
  @observable isSaving: boolean = false;

  @computed
  get form(): KycFormField[] {
    // $FlowFixMe
    return this.props.schema.map((field) => ({
      ...field,
      value: this.formData.get(field.name),
      error: this.formErrors.get(field.name),
    }));
  }

  @action
  validateForm = () => {
    this.formErrors.clear();

    const validationErrors = validateKycForm(this.form);

    validationErrors.forEach(({ name, error }) => {
      this.formErrors.set(name, error);
    });
  };

  @action
  handleChangeFormField = (
    name: KycFormFieldName,
    value: KycFormFieldValue,
  ) => {
    this.formData.set(name, value);
    this.formErrors.delete(name);
  };

  @action
  handleSubmit = async () => {
    this.validateForm();

    if (this.formErrors.size > 0) {
      return;
    }

    this.isSaving = true;

    try {
      await this.props.onSubmit();
    } catch (error) {
      const { fieldErrors } = error.response.data;

      if (fieldErrors) {
        runInAction(() => {
          Object.keys(fieldErrors).forEach((fieldName) => {
            const [fieldError] = fieldErrors[fieldName];

            this.formErrors.set(fieldName, fieldError);
          });
        });
      }
    }

    runInAction(() => {
      this.isSaving = false;
    });
  };

  render() {
    return (
      <ExtendedKycFormView
        form={this.form}
        tokenSymbol={this.props.tokenSymbol}
        isDisabled={this.isSaving}
        getFileUrlById={this.props.getFileUrlById}
        uploadFiles={this.props.uploadFiles}
        onChangeKycFormField={this.handleChangeFormField}
        onSave={this.handleSubmit}
      />
    );
  }
}

const ObservingExtendedKycForm = observer(ExtendedKycForm);

export default inject(
  ({ kyc, sale }: { kyc: KycStore, sale: SaleStore }): Props => ({
    tokenSymbol: sale.state.tokenSymbol,
    initialFormData: kyc.state.formData,
    schema: kyc.state.formSchema,
    getFileUrlById: kyc.getFileUrlById,
    uploadFiles: kyc.uploadFiles,
    onSubmit: kyc.saveData,
  }),
)(ObservingExtendedKycForm);
