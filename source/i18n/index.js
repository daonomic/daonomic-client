import i18next from 'i18next';
import xhrBackend from 'i18next-xhr-backend';
import { reactI18nextModule } from 'react-i18next';

i18next
  .use(reactI18nextModule)
  .use(xhrBackend)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common', 'auth', 'faq', 'paymentMethods', 'wallet', 'widgets'],
    defaultNS: 'common',
  });

export default i18next;
