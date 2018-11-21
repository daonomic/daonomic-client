// @flow
import authNamespace from '~/domains/app/i18n/translations/auth/en.json';
import commonNamespace from '~/domains/app/i18n/translations/common/en.json';
import faqNamespace from '~/domains/app/i18n/translations/faq/en.json';
import paymentMethodsNamespace from '~/domains/app/i18n/translations/payment-methods/en.json';
import kycNamespace from '~/domains/app/i18n/translations/kyc/en.json';
import widgetsNamespace from '~/domains/app/i18n/translations/widgets/en.json';
import exchangeNamespace from '~/domains/app/i18n/translations/exchange/en.json';
import paymentsListNamespace from '~/domains/app/i18n/translations/payments-list/en.json';
import referralProgramNamespace from '~/domains/app/i18n/translations/referral-program/en.json';
import processTemplate from '~/domains/app/i18n/utils/process-template';

import type { NamespaceId, Namespace } from '~/domains/app/i18n/types';

const namespaces: Map<NamespaceId, Namespace> = new Map([
  ['auth', authNamespace],
  ['common', commonNamespace],
  ['faq', faqNamespace],
  ['paymentMethods', paymentMethodsNamespace],
  ['kyc', kycNamespace],
  ['widgets', widgetsNamespace],
  ['exchange', exchangeNamespace],
  ['paymentsList', paymentsListNamespace],
  ['referralProgram', referralProgramNamespace],
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
