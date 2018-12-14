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

- `ENABLE_SOURCEMAPS=true` enables sourcemaps for debugging
- `ENVIRONMENT` (`production` by default, may be `staging` or `development`) specifies in which environment the app will be used

Example usage:

```
ENABLE_SOURCEMAPS=true ENVIRONMENT=staging npm run build
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

Run in development mode:

```bash
E2E_TEST=true ENVIRONMENT=development npm run build
serve build -s
npx cypress open
```
