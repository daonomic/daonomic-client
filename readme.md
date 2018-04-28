# Daonomic client

In order to develop and build this project you need Node.js `^8.9.0` and NPM `^5.5.1` installed.

## Development

Start development server:

```bash
npm start
# or
PORT=8080 npm start
```

## Build

Build project for production:

```bash
npm run build
```

### Options

Build options are specified using environment variables:

* `DEBUG_ENABLED=true` enables sourcemaps for debugging
* `API` (`production` by default, may be `staging` or `development`) specifies which API server to use

Example usage:

```
DEBUG_ENABLED=true API=staging npm run build
```

## i18n

All translations can be edited at `./source/i18n/translations`.

## Testing

### Linters

```bash
npm run test:lint
```

### Typecheck

```bash
npm run test:types
```

### Unit

```bash
npm run test:unit
```

### End-to-end

```bash
npm run test:e2e
```

Enable debugging:

```bash
DEBUG_ENABLED=true npm run test:e2e
```

Run specific test suite:

```bash
npm run test:e2e -- --suite happyPath
```

Test suites are defined in `suites` option of `wdio.config.js`.

If you want to add a breakpoint, just add `await browser.debug();` at the desired point of a test file.
