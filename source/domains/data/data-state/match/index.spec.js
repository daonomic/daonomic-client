// @flow
import { matchDataState } from '.';

describe('matchDataState', () => {
  test('should match failed state and prefer it over loading state', () => {
    const failedFn = jest.fn();
    const otherFn = jest.fn();

    matchDataState(['idle', 'loading', 'failed'], {
      loading: otherFn,
      loaded: otherFn,
      failed: failedFn,
    });

    expect(otherFn).not.toHaveBeenCalled();
    expect(failedFn).toHaveBeenCalledTimes(1);
  });

  test('should match loading state', () => {
    const loadingFn = jest.fn();
    const otherFn = jest.fn();

    matchDataState(['loaded', 'loading'], {
      loading: loadingFn,
      loaded: otherFn,
      failed: otherFn,
    });

    expect(otherFn).not.toHaveBeenCalled();
    expect(loadingFn).toHaveBeenCalledTimes(1);
  });

  test('should match loaded state', () => {
    const loadedFn = jest.fn();
    const otherFn = jest.fn();

    matchDataState(['loaded', 'loaded'], {
      loading: otherFn,
      loaded: loadedFn,
      failed: otherFn,
    });

    expect(otherFn).not.toHaveBeenCalled();
    expect(loadedFn).toHaveBeenCalledTimes(1);
  });
});
