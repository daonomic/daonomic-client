// @flow
import { createAsyncObserver } from '.';

describe('createAsyncObserver', () => {
  test('Should return `observe` function', () => {
    const fn = jest.fn();
    const observe = createAsyncObserver(fn);

    expect(typeof observe).toBe('function');
    expect(fn).not.toBeCalled();
  });

  test.todo('Should work correctly');

  test.todo(
    'Should handle multiple subscribers and unsubscribe completely only if no active subscribers left',
  );
});
