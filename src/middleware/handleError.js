const { logFile } = require('./logging');
module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const message = err.message;
  switch (message.slice(0, 3)) {
    case '404':
      res.status(404).send(`404 Not found ${message.slice(3)}`);
      break;
    case '400':
      res.status(400).send(`400 Bad request ${message.slice(3)}`);
      break;
    default:
      res.status(500).send('500 Server error');
      logFile.error(err.message);
  }
};

module.exports.catchErr = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (e) {
    return next(e);
  }
};
