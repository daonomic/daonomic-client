// @flow
import type { DataState } from '~/types/common';

export function matchDataState<T>(
  dataStates: DataState[],
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
