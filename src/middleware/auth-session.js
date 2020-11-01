const { ACCESS } = require('../utils/errors');

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(ACCESS.text());
};
