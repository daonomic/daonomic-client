import { removeEmptyEntries } from './';

describe('removeEmptyEntries', () => {
  test('should deeply remove empty strings', () => {
    expect(
      removeEmptyEntries({
        a: '',
        b: 'qwerty',
        c: {
          d: '12345',
          e: '',
        },
      }),
    ).toEqual({
      b: 'qwerty',
      c: {
        d: '12345',
      },
    });
  });
});
