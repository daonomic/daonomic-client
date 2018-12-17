// @flow
import MessageFormat from 'messageformat';
import { getNamespaceEntries } from './namespaces';

export { formatDate, formatTime } from './formatters/date';
export { formatNumber } from './formatters/number';

const messageFormat = new MessageFormat('en');

export function getTranslation(
  id: string,
  data?: { [key: string]: string | number },
): string {
  const [namespaceId, ...keyParts] = id.split(':');
  const key = keyParts.join(':');
  const namespaceEntries = getNamespaceEntries(namespaceId);
  const template = namespaceEntries[key];

  if (template) {
    const formatTemplate = messageFormat.compile(template);

    return formatTemplate(data);
  } else {
    return key;
  }
}
