// @flow
import * as React from 'react';
import { mergeDeepRight } from 'ramda';
import { observable, action, runInAction, computed, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Button, FieldHint } from '@daonomic/ui';
import { JsonSchemaForm } from '~/components/json-schema-form';
import { setInternalKycData, loadAndSetKycState } from '~/modules/kyc/actions';
import { getTranslation } from '~/i18n';
import { getMarker } from '~/utils/get-marker';

import type { Form } from '~/modules/kyc/types';

type Props = {|
  form: Form,
  url: string,
|};

class ExtendedKycForm extends React.Component<Props> {
  marker = getMarker('extended-kyc-form');

  @observable observableFormData: {} = {};
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
        url: this.props.url,
      });
      await loadAndSetKycState();
    } catch (error) {
      runInAction(() => {
        this.savingFailed = true;
      });
    }

    runInAction(() => {
      this.isSaving = false;
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

export default observer(ExtendedKycForm);
