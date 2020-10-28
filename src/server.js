/* eslint-disable no-process-exit */
const { logFile } = require('./middleware/logging');
process
  .on('uncaughtException', err => {
    logFile.error(`Unhandled Exception: ${err.message}`);
    process.exit(1);
  })
  .on('unhandledRejection', err => {
    logFile.error(`Unhandled Exception: ${err.message}`);
    process.exit(1);
  });

const { PORT } = require('./common/config');
const app = require('./app');
const connectDB = require('./dataBase/mongoDB');
const isMongoBase = true;

if (isMongoBase) {
  connectDB(() => {
    app.listen(PORT, () =>
      logFile.info(`App is running on http://localhost:${PORT}`)
    );
  });
} else {
  app.listen(PORT, () =>
    logFile.info(`App is running on http://localhost:${PORT}`)
  );
}
