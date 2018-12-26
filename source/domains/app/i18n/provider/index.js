// @flow
import { fromPairs } from 'ramda';
// $FlowFixMe
import { setupI18n } from '@lingui/core';
import NanoEvents from 'nanoevents';
import en from '@lingui/loader!~/locales/en/messages.po'; // eslint-disable-line import/no-extraneous-dependencies
import ru from '@lingui/loader!~/locales/ru/messages.po'; // eslint-disable-line import/no-extraneous-dependencies

export const supportedLanguages = [
  { id: 'en', name: 'English', catalog: en },
  { id: 'ru', name: 'Русский', catalog: ru },
];

export const i18n = setupI18n({
  language: supportedLanguages[0].id,
  catalogs: fromPairs(
    supportedLanguages.map((language) => [language.id, language.catalog]),
  ),
});

export const languageChangeEmitter = new NanoEvents();

export function setLanguage(language: string) {
  i18n.activate(language);
  languageChangeEmitter.emit('change', language);
}

export function onLanguageChange(fn: (string) => mixed) {
  return languageChangeEmitter.on('change', fn);
}

window.setLanguage = setLanguage;
