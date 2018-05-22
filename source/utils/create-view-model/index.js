// @flow
import { createViewModel as mobxUtilsCreateViewModel } from 'mobx-utils';

interface IViewModel<T> {
  model: T;
  reset(): void;
  submit(): void;
  isDirty: boolean;
  isPropertyDirty(key: string): boolean;
}

export default function createViewModel<T>(model: T): T & IViewModel<T> {
  return mobxUtilsCreateViewModel(model);
}
