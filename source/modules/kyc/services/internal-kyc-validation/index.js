// @flow
import { getTranslation } from '~/i18n';
import type { Field, FieldName } from '~/modules/kyc/types';

const requiredError = getTranslation('common:requiredField');

type ValidationEntry = {|
  name: FieldName,
  error: string,
|};

type ValidatorParams = {|
  field: Field,
  allFields: Field[],
|};

type Validator = (params: ValidatorParams) => ?ValidationEntry;

const validators: Validator[] = [
  ({ field }) => {
    if (field.type === 'FILE' && field.required && field.value.length === 0) {
      return {
        name: field.name,
        error: requiredError,
      };
    }
  },
  ({ field }) => {
    if (field.required && !field.value) {
      return {
        name: field.name,
        error: requiredError,
      };
    }
  },
];

export function validateInternalKycForm(form: Field[]): ValidationEntry[] {
  const errors = [];

  form.forEach((field, _, allFields) => {
    const [fieldValidationResult] = validators
      .map((validator) => validator({ field, allFields }))
      .filter(Boolean);

    if (fieldValidationResult) {
      errors.push(fieldValidationResult);
    }
  });

  return errors;
}
