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
const os = require('os');
const { PORT } = require('./common/config');
const app = require('./app');
const connectDB = require('./dataBase/mongoDB');
const isMongoBase = true;
const osArr = os.networkInterfaces();
let ip = '';
Object.values(osArr).forEach(val =>
  val.forEach(obj => {
    if (obj.family === 'IPv4' && !obj.internal) {
      ip = obj.address;
    }
  })
);
const runningText = `App is running on http://localhost:${PORT} (${ip})`;
if (isMongoBase) {
  connectDB(() => {
    app.listen(PORT, () => logFile.info(runningText));
  });
} else {
  app.listen(PORT, () => logFile.info(runningText));
}
