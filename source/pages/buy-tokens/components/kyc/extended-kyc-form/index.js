// @flow
import * as React from 'react';
import axios from 'axios';
import { fromPairs, path } from 'ramda';
import { observable, computed, action, runInAction } from 'mobx';
import { observer, inject } from 'mobx-react';
import ExtendedKycFormView from './view';
import {
  getDefaultFieldValue,
  validateInternalKycForm,
} from '~/modules/kyc/services';
import { setInternalKycData, loadAndSetKycState } from '~/modules/kyc/actions';

import type { UserId } from '~/types/auth';
import type { IAuth } from '~/stores/auth/types';
import type { KycStore } from '~/modules/kyc/store';
import type { SaleStore } from '~/stores/sale';
import type {
  BaseField,
  Field,
  FieldName,
  FieldValue,
} from '~/modules/kyc/types';

type FormDataAsMap = Map<FieldName, FieldValue>;

type InjectedProps = {|
  tokenSymbol: string,
  userId: UserId,
|};

type Props = InjectedProps & {|
  fields: BaseField[],
  url: string,
  initialFormData?: FormDataAsMap,
|};

class ExtendedKycForm extends React.Component<Props> {
  @observable formData: FormDataAsMap = this.getInitialFormData();
  @observable formErrors: Map<FieldName, string> = new Map();
  @observable isSaving: boolean = false;

  @computed
  get form(): Field[] {
    // $FlowFixMe
    return this.props.fields.map((field) => ({
      ...field,
      value: this.formData.get(field.name),
      error: this.formErrors.get(field.name),
    }));
  }

  @action
  validateForm = () => {
    this.formErrors.clear();

    const validationErrors = validateInternalKycForm(this.form);

    validationErrors.forEach(({ name, error }) => {
      this.formErrors.set(name, error);
    });
  };

  @action
  handleChangeFormField = (name: FieldName, value: FieldValue) => {
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
      await setInternalKycData({
        data: fromPairs(Array.from(this.formData.entries())),
        baseUrl: this.props.url,
        userId: this.props.userId,
      });
      await loadAndSetKycState();
    } catch (error) {
      const fieldErrors = path(['response', 'data', 'fieldErrors'], error);

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

  getInitialFormData = (): FormDataAsMap => {
    return (
      this.props.initialFormData ||
      this.props.fields.reduce((formData, field) => {
        formData.set(field.name, getDefaultFieldValue(field));
        return formData;
      }, new Map())
    );
  };

  getFileUrlById = (id: string): string => `${this.props.url}/files/${id}`;

  uploadFiles = ({
    files,
    onUploadProgress,
  }: {
    files: File[],
    onUploadProgress: (event: ProgressEvent) => void,
  }) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('file[]', file);
    });

    return axios.post(`${this.props.url}/files`, formData, {
      onUploadProgress,
    });
  };

  render() {
    return (
      <ExtendedKycFormView
        form={this.form}
        tokenSymbol={this.props.tokenSymbol}
        isDisabled={this.isSaving}
        getFileUrlById={this.getFileUrlById}
        uploadFiles={this.uploadFiles}
        onChangeField={this.handleChangeFormField}
        onSave={this.handleSubmit}
      />
    );
  }
}

export default inject(
  ({
    sale,
    auth,
  }: {
    kyc: KycStore,
    sale: SaleStore,
    auth: IAuth,
  }): InjectedProps => ({
    tokenSymbol: sale.state.tokenSymbol,
    userId: auth.id,
  }),
)(observer(ExtendedKycForm));
