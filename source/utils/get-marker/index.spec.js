import getMarker from './';

describe('getMarker', () => {
  test('should work', () => {
    expect(typeof getMarker('login')).toBe('function');
    expect(typeof getMarker('login', 'submit')).toBe('function');
    expect(getMarker('login')()).toBe('login');
    expect(getMarker('login', 'submit')()).toBe('login/submit');
    expect(getMarker('login')('submit')()).toBe('login/submit');
    expect(getMarker('login', 'form', 'submit')()).toBe('login/form/submit');
    expect(getMarker('login', 'form')('submit')()).toBe('login/form/submit');
    expect(getMarker('login')('form', 'submit')()).toBe('login/form/submit');
    expect(getMarker('login')('form')('submit')()).toBe('login/form/submit');

    const pageMarker = getMarker('login');

    expect(pageMarker('form')()).toBe('login/form');
    expect(pageMarker('form')('submit')()).toBe('login/form/submit');
  });
});
