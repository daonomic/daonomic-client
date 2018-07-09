// @flow
import descriptionToMarkup from './';

describe('descriptionToMarkup', () => {
  test('should not modify string without links', () => {
    const testDescription = 'Test description without any links.';

    expect(descriptionToMarkup(testDescription)).toEqual(testDescription);
  });

  test('should replace markdown links with proper markup', () => {
    expect(
      descriptionToMarkup(
        'Test field description [with link](https://google.com) [in](https://t.me) body',
      ),
    ).toEqual(
      'Test field description <a href="https://google.com" target="_blank" rel="noopener noreferrer">with link</a> <a href="https://t.me" target="_blank" rel="noopener noreferrer">in</a> body',
    );
  });
});
