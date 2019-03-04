// @flow
export type FormValidationResult = {|
  reason?: string,
  genericErrors: string[],
  fieldErrors: {|
    [key: string]: ?(string[]),
  |},
|};

export type FormValidationError = {
  response: {
    data: FormValidationResult,
  },
};
