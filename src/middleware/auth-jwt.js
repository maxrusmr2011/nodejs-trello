const { ACCESS } = require('../utils/errors');
const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return next(ACCESS.text());
    req.user = user;
    next();
  })(req, res, next);
};
