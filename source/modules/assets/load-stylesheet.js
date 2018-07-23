// @flow
export function loadStylesheet(sourceUrl: string): Promise<HTMLLinkElement> {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');

    link.onerror = reject;
    link.onload = () => resolve(link);
    link.rel = 'stylesheet';
    link.href = sourceUrl;

    if (document.head) {
      document.head.appendChild(link);
    }
  });
}
