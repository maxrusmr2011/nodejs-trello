/* eslint-disable no-process-exit */
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const favicon = require('serve-favicon');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const handleError = require('./middleware/handleError');
const logging = require('./middleware/logging');

process.on('uncaughtException', err => {
  logging.logFile.error(`Unhandled Exception: ${err.message}`);
  process.exit(1);
});

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
app.use(favicon('./favicon.ico'));
app.use(express.json());
app.use(logging);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('*', (req, res) => res.status(404).send('Url not found'));
app.use(handleError);

process.on('unhandledRejection', err => {
  logging.logFile.error(`Unhandled Exception: ${err.message}`);
  process.exit(1);
});
// if (express) throw Error('Test error!');
// Promise.reject(Error('Test errors!'));

module.exports = app;
