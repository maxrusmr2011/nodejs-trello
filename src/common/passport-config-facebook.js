// const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const FACEBOOK_CLIENT_ID = '378308286625849';
const FACEBOOK_CLIENT_SECRET = '3720658f2be71700c0a6217ac91e4621';
const User = require('../resources/users/user.mongodb.model');

const configFacebook = passport => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/facebook/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        const { id, displayName: name, provider } = profile;
        const newUser = { _id: id, name, provider };
        console.log(newUser);

        const user = await User.findById(id);
        if (!user) {
          await User.create(newUser);
          return done(null, await User.findById(id));
        }
        const all = await User.find({});
        console.log(all);
        return done(null, user);
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

module.exports = configFacebook;
