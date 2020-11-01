const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const favicon = require('serve-favicon');
const passport = require('passport');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const handleError = require('./middleware/handleError');
const logging = require('./middleware/logging');
const { JWT_SECRET_KEY } = require('./common/config');
const { INCORRECT } = require('./utils/errors');
// const jade = require('jade');

const isSession = false;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
app.use(favicon('./favicon.ico'));
app.use(logging);

if (isSession) {
  require('./common/passport-config-local')(passport);
  require('./common/passport-config-google')(passport);
  require('./common/passport-config-facebook')(passport);
  const session = require('express-session');
  app.use(
    session({
      secret: JWT_SECRET_KEY,
      resave: false,
      saveUninitialized: false
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const logout = fn => (req, res, next) => {
    req.logOut();
    fn(req, res, next);
  };
  app.post(
    '/login',
    logout(passport.authenticate(['local', 'facebook', 'google'])),
    (req, res) => {
      res.status(200).json({ message: 'Success login' });
    }
  );
} else {
  require('./common/passport-config-jwt')(passport);

  app.use(passport.initialize());
  const User = require('./resources/users/user.mongodb.model');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  app.post('/login', async (req, res, next) => {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user) return next(INCORRECT.text('login'));
    if (!(await bcrypt.compare(password, user.password))) {
      return next(INCORRECT.text('password'));
    }
    const payload = {
      login: user.login,
      userId: user.id
    };
    console.log('=', payload);
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 3600 });
    return res.status(200).json({ token });
  });
}

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.get('/login', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views/login.html'));
  res.render('login', { isSession });
});
app.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Success logout' });
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

const auth = isSession
  ? require('./middleware/auth-session')
  : require('./middleware/auth-jwt');

app.use('/users', auth, userRouter);
app.use('/boards', auth, boardRouter);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

app.use('*', (req, res) => res.status(404).send(`Url not found ${req.url}`));
app.use(handleError);

module.exports = app;
