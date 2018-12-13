npm install
ENABLE_SOURCEMAPS=true npm run build
find ./build -name "*.js.map" -exec rm {} \;
