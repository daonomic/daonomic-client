// @flow
interface IViewModel<T> {
  model: T;
  reset(): void;
  submit(): void;
  isDirty: boolean;
  isPropertyDirty(key: string): boolean;
}

declare module 'mobx-utils' {
  declare module.exports: {
    createViewModel: <T>(model: T) => T & IViewModel<T>,
  };
}
