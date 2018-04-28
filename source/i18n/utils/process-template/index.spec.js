import processTemplate from './';

describe('processTemplate', () => {
  test('should work', () => {
    expect(processTemplate('test')).toBe('test');
    expect(processTemplate('A simple {{thing}}', { thing: 'template' })).toBe(
      'A simple template',
    );
  });
});
