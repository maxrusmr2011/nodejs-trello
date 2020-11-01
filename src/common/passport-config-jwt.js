const User = require('../resources/users/user.mongodb.model');
// const bcrypt = require('bcrypt');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { JWT_SECRET_KEY } = require('./config');

const initialize = passport => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET_KEY
      },
      async (payload, done) => {
        console.log('pay=', payload);
        try {
          const user = await User.findById(payload.userId);
          if (!user) {
            return done(null, false, '401');
          }
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
  // passport.serializeUser((user, done) => {
  //   console.log('serializer');
  //   done(null, user.id);
  // });
  // passport.deserializeUser(async (id, done) => {
  //   const user = await User.findById(id);
  //   console.log('deserializer', id);
  //   done(null, user);
  // });
};

module.exports = initialize;
