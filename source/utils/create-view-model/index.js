// @flow
import { createViewModel as mobxUtilsCreateViewModel } from 'mobx-utils';

export interface IViewModel<T> {
  model: T;
  reset(): void;
  submit(): void;
  isDirty: boolean;
  isPropertyDirty(key: string): boolean;
}

export type ViewModel<T> = T & IViewModel<T>;

export function createViewModel<T>(model: T): ViewModel<T> {
  return mobxUtilsCreateViewModel(model);
}
