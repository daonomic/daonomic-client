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

- `DEBUG_ENABLED=true` enables sourcemaps for debugging
- `ENVIRONMENT` (`production` by default, may be `staging` or `development`) specifies in which environment the app will be used

Example usage:

```
DEBUG_ENABLED=true ENVIRONMENT=staging npm run build
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

#### Running a specific test sute

```bash
npm run test:e2e -- --suite happyPath
```

Test suites are defined in `suites` option of `wdio.config.js`.

#### Debugging

Run tests on local development server:

```bash
E2E_TEST=true npm start # start dev server in E2E mode
E2E_MODE=development npm run test:e2e
```

Run tests for production but with visible browser window (disable headless mode):

```bash
DEBUG_ENABLED=true npm run test:e2e
```

If you want to add a breakpoint, just add `await browser.debug();` at the desired point of a test file.
