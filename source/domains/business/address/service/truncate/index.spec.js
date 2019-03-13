// @flow
import { truncate } from '.';

describe('truncate', () => {
  it('should work', () => {
    expect(truncate('0xE6dA99269890Fd519F9bDcadE239D03624da1404')).toBe(
      '0xE6d...404',
    );
  });
});
