import i18next from 'i18next';
import { reactI18nextModule } from 'react-i18next';

i18next
  .use(reactI18nextModule)
  .init({
    lng: 'en',
    defaultNS: 'common',
  });

const enLocale = window.config.locales.en;

Object.keys(enLocale).forEach((namespace) => {
  i18next.addResourceBundle('en', namespace, enLocale[namespace], true, true);
});

export default i18next;
