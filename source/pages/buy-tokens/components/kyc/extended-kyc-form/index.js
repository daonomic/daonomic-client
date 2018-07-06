// @flow
import * as React from 'react';
import axios from 'axios';
import { mergeDeepRight } from 'ramda';
import { observable, action, runInAction, computed, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Button, FieldHint } from '@daonomic/ui';
import { JsonSchemaForm } from '~/components/json-schema-form';
import { setInternalKycData, loadAndSetKycState } from '~/modules/kyc/actions';
import { getTranslation } from '~/i18n';
import getMarker from '~/utils/get-marker';

import type { UserId } from '~/types/auth';
import type { IAuth } from '~/stores/auth/types';
import type { KycStore } from '~/modules/kyc/store';
import type { SaleStore } from '~/stores/sale';
import type { Form } from '~/modules/kyc/types';

type InjectedProps = {|
  userId: UserId,
|};

type Props = InjectedProps & {|
  form: Form,
  url: string,
  initialFormData?: {},
|};

class ExtendedKycForm extends React.Component<Props> {
  marker = getMarker('extended-kyc-form');

  @observable observableFormData: {} = this.props.initialFormData || {};
  @observable isSaving: boolean = false;
  @observable savingFailed: boolean = false;

  @computed
  get formData(): {} {
    return toJS(this.observableFormData);
  }

  @action
  handleChange = ({ formData }: { formData: {} }) => {
    this.observableFormData = formData;
  };

  @action
  handleSubmit = async () => {
    this.isSaving = true;

    try {
      await setInternalKycData({
        data: this.formData,
        baseUrl: this.props.url,
        userId: this.props.userId,
      });
      await loadAndSetKycState({ userId: this.props.userId });
    } catch (error) {
      runInAction(() => {
        this.savingFailed = true;
      });
    }

    runInAction(() => {
      this.isSaving = false;
    });
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

  renderSavingError = () => {
    if (!this.savingFailed) {
      return null;
    }

    return (
      <FieldHint type="error">
        {getTranslation('common:somethingWentWrong')}
      </FieldHint>
    );
  };

  render() {
    const uiSchema = {
      'ui:disabled': this.isSaving ? true : undefined,
    };

    return (
      <div data-marker={this.marker()}>
        <JsonSchemaForm
          schema={this.props.form.jsonSchema}
          uiSchema={mergeDeepRight(this.props.form.uiSchema, uiSchema)}
          formData={this.formData}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <Button
            data-marker={this.marker('submit')()}
            design="primary"
            type="submit"
            disabled={this.isSaving}
          >
            {getTranslation('common:submit')}
          </Button>
          {this.renderSavingError()}
        </JsonSchemaForm>
      </div>
    );
  }
}

export default inject(
  ({
    auth,
  }: {
    kyc: KycStore,
    sale: SaleStore,
    auth: IAuth,
  }): InjectedProps => ({
    userId: auth.id,
  }),
)(observer(ExtendedKycForm));
