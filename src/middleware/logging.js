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
    // console.log(req);
    logFile.info(
      `[${date}] ${
        req.method
      } ${statusCode} ${url} [${time}ms] query:${JSON.stringify(
        req.query
      )} params:${JSON.stringify(req.params)} body:${JSON.stringify(req.body)}`
    );
    // console.log(`[${date}]`, req.method, statusCode, req.url, `[${time}ms]`);
    // if (Object.keys(req.query).length) {
    //   console.log('query:', req.query);
    // }
    // if (Object.keys(req.body).length) {
    //   console.log('body:', req.body);
    // }
  });
  next();
};
module.exports.logFile = logFile;
