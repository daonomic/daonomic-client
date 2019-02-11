// @flow
import * as DataStateTypes from '~/domains/data/data-state/types';

export function matchDataState<T>(
  dataStates: DataStateTypes.DataState[],
  states: { loading: () => T, loaded: () => T, failed: () => T },
): T {
  if (dataStates.some((state) => state === 'failed')) {
    return states.failed();
  }

  if (dataStates.some((state) => state === 'loading')) {
    return states.loading();
  }

  return states.loaded();
}
