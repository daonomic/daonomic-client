// @flow

export default function processTemplate(
  template: string,
  data: { [key: string]: string } = {},
): string {
  return template.replace(/{{([^}]+)}}/g, (_, key) => data[key.trim()] || '');
}
