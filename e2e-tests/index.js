const path = require('path');
const getPort = require('get-port');
const selenium = require('selenium-standalone');
const liveServer = require('live-server');
const { Launcher } = require('webdriverio');
const { argv } = require('yargs');

process.on('unhandledRejection', (reason, p) => {
  // eslint-disable-next-line no-console
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

selenium.start(async (error, child) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
    return;
  }

  const uiServerPort = await getPort();

  liveServer.start({
    port: uiServerPort,
    root: path.resolve(__dirname, '../build'),
    open: false,
    file: 'index.html',
  });

  const wdio = new Launcher(path.resolve(__dirname, '../wdio.config.js'), {
    baseUrl: `http://localhost:${uiServerPort}`,
    suite: argv.suite,
  });

  wdio.run().then(
    (exitCode) => {
      child.kill();
      process.exit(exitCode);
    },
    (error) => {
      console.error('Launcher failed to start the test', error.stacktrace); // eslint-disable-line no-console
      child.kill();
      process.exit(1);
    },
  );
});
