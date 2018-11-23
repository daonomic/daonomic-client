import { getMarkerSelector } from '.';

describe('getMarkerSelector', () => {
  test('should work', () => {
    expect(typeof getMarkerSelector('login')).toBe('function');
    expect(typeof getMarkerSelector('login', 'submit')).toBe('function');
    expect(getMarkerSelector('login')()).toBe('[data-marker="login"]');
    expect(getMarkerSelector('login', 'submit')()).toBe(
      '[data-marker="login/submit"]',
    );
    expect(getMarkerSelector('login')('submit')()).toBe(
      '[data-marker="login/submit"]',
    );
    expect(getMarkerSelector('login', 'form', 'submit')()).toBe(
      '[data-marker="login/form/submit"]',
    );
    expect(getMarkerSelector('login', 'form')('submit')()).toBe(
      '[data-marker="login/form/submit"]',
    );
    expect(getMarkerSelector('login')('form', 'submit')()).toBe(
      '[data-marker="login/form/submit"]',
    );
    expect(getMarkerSelector('login')('form')('submit')()).toBe(
      '[data-marker="login/form/submit"]',
    );

    const pageMarker = getMarkerSelector('login');

    expect(pageMarker('form')()).toBe('[data-marker="login/form"]');
    expect(pageMarker('form')('submit')()).toBe(
      '[data-marker="login/form/submit"]',
    );
  });
});
