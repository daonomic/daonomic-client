// @flow
import { getNamespaceEntries } from './namespaces';
import processTemplate from './utils/process-template';

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
