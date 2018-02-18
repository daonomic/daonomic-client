import omit from './';

describe('omit', () => {
  test('should omit specified object keys', () => {
    expect(omit(['a', 'c'])({ a: 1, b: 2, c: 3 })).toEqual({ b: 2 });
    expect(omit([])({ a: 1 })).toEqual({ a: 1 });
  });
});
