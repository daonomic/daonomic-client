// @flow
const getScopedPersistenceKey = (key: string) =>
  `daonomic:registrationService:${key}`;

export const registrationService = {
  persistRegisteredEmail: (email: string) => {
    try {
      window.sessionStorage.setItem(
        getScopedPersistenceKey('registeredEmail'),
        email,
      );
    } catch (error) {
      // do nothing
    }
  },
  getPersistedRegisteredEmail: () => {
    try {
      return window.sessionStorage.getItem(
        getScopedPersistenceKey('registeredEmail'),
      );
    } catch (error) {
      return;
    }
  },
};
