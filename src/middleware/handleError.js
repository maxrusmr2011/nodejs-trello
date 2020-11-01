const { logFile } = require('./logging');
const {
  NOT_FOUND,
  BAD_REQUEST,
  ACCESS,
  INCORRECT,
  SERVER
} = require('../utils/errors');
module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { message } = err;
  switch (parseInt(message, 10)) {
    case NOT_FOUND.code:
      res.status(NOT_FOUND.code).send(err);
      break;
    case BAD_REQUEST.code:
      res.status(BAD_REQUEST.code).send(err);
      break;
    case ACCESS.code:
      res.status(ACCESS.code).send(err);
      break;
    case INCORRECT.code:
      res.status(INCORRECT.code).send(err);
      break;
    default:
      res.status(SERVER.code).send({ message: SERVER.text });
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
