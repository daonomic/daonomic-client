// @flow
import { config } from '~/domains/app/config';

export function createAsyncObserver(operation: () => Promise<mixed>) {
  let activeSubscribersCount = 0;
  let timerId = null;

  return function observe() {
    activeSubscribersCount += 1;

    const unsubscribe = () => {
      activeSubscribersCount -= 1;

      if (activeSubscribersCount === 0) {
        clearTimeout(timerId);
        timerId = null;
      }
    };

    if (timerId) {
      return unsubscribe;
    }

    const load = async () => {
      await operation();

      if (activeSubscribersCount > 0) {
        timerId = setTimeout(load, config.defaultPollingInterval);
      }
    };

    timerId = setTimeout(load, config.defaultPollingInterval);
    return unsubscribe;
  };
}
