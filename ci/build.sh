npm ci

ENABLE_SOURCEMAPS=true \
 UPLOAD_SOURCEMAPS_TO_SENTRY=true \
 npm run build

find ./build -name "*.js.map" -exec rm {} \;
