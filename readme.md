[![Build Status](https://travis-ci.org/daonomic/daonomic-client.svg?branch=master)](https://travis-ci.org/daonomic/daonomic-client)

# Daonomic client

In order to develop and build this project you need Node.js `^8.9.0` and NPM `^5.5.1` installed.

```shell
npm install # installs project dependencies

npm start # starts development server
PORT=8080 npm start # starts development server on specified port

npm run build # builds project
DEBUG_ENABLED=true npm run build # builds project with sourcemaps for debugging
API=development npm run build # builds project but switches it to use the development API server
```
