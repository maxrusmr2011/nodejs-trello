// const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID =
  '703138555720-gkvk4pqqcllqctpl8lr64jrdan63r0an.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'u-zYp6ZA0-QqHn3frneikT_Q';
const User = require('../resources/users/user.mongodb.model');

const configGoogle = passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/google/callback'
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

module.exports = configGoogle;
