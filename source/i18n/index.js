// @flow
import authNamespace from '~/i18n/translations/auth/en.json';
import commonNamespace from '~/i18n/translations/common/en.json';
import faqNamespace from '~/i18n/translations/faq/en.json';
import paymentMethodsNamespace from '~/i18n/translations/payment-methods/en.json';
import walletNamespace from '~/i18n/translations/wallet/en.json';
import widgetsNamespace from '~/i18n/translations/widgets/en.json';
import processTemplate from '~/i18n/utils/process-template';

import type { NamespaceId, Namespace } from '~/i18n/types';

const namespaces: Map<NamespaceId, Namespace> = new Map([
  ['auth', authNamespace],
  ['common', commonNamespace],
  ['faq', faqNamespace],
  ['paymentMethods', paymentMethodsNamespace],
  ['wallet', walletNamespace],
  ['widgets', widgetsNamespace],
]);

function getNamespaceEntries(id: NamespaceId): Namespace {
  return namespaces.get(id) || {};
}

export function getTranslation(
  id: string,
  data?: { [key: string]: string },
): string {
  const [namespaceId, ...keyParts] = id.split(':');
  const key = keyParts.join(':');
  const namespaceEntries = getNamespaceEntries(namespaceId);
  const template = namespaceEntries[key];

  return template ? processTemplate(template, data) : key;
}
