// @flow
export function loadScript(sourceUrl: string): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.onerror = reject;
    script.onload = () => resolve(script);
    script.src = sourceUrl;

    if (document.body) {
      document.body.appendChild(script);
    }
  });
}
