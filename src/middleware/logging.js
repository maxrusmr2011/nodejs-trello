const { finished } = require('stream');
const { createLogger, format, transports } = require('winston');

const logFile = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.combine(
        // format.timestamp(),
        format.uncolorize(),
        format.json()
      )
    }),
    new transports.File({
      filename: 'logs/info.log',
      level: 'info',
      format: format.combine(
        // format.timestamp(),
        format.uncolorize(),
        format.json()
      )
    })
  ]
});
// logFile.info('info');
// logFile.silly('silly');
// logFile.error('error');
module.exports = (req, res, next) => {
  const date = new Date().toLocaleString();
  const start = Date.now();
  const { url } = req;

  finished(res, () => {
    const time = Date.now() - start;
    const { statusCode } = res;
    const { method, query, params, body } = req;
    if ('password' in body) body.password = '***';
    logFile.info(
      `[${date}] ${method} ${statusCode} ${url} [${time}ms] query:${JSON.stringify(
        query
      )} params:${JSON.stringify(params)} body:${JSON.stringify(body)}`
    );
  });
  next();
};
module.exports.logFile = logFile;
