const User = require('../resources/users/user.mongodb.model');
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;

const initialize = passport => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'login' },
      async (login, password, done) => {
        const user = await User.findOne({ login });
        if (!user) {
          return done(Error('403login'));
        }
        try {
          if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
          }
          return done(Error('403password'));
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    console.log('serializer');
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    console.log('deserializer', id);
    done(null, user);
  });
};

module.exports = initialize;
