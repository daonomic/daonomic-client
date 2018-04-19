// @flow

export function fillPathParams({ path, params }: { path: string, params: {} }) {
  return path
    .split('/')
    .map((segment) => {
      if (segment.startsWith(':')) {
        return params[segment.slice(1)] || segment;
      }

      return segment;
    })
    .join('/');
}
