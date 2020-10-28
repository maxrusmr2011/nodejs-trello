const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const favicon = require('serve-favicon');
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const handleError = require('./middleware/handleError');
const logging = require('./middleware/logging');

const initPassport = require('./common/passport-config');
initPassport(passport);

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: 'cats',
    resave: false,
    saveUninitialized: false
    // passReqToCallback: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
app.use(favicon('./favicon.ico'));
app.use(logging);

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/login.html'));
});
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
app.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Oops'
  }),
  (req, res) => {
    console.log('pass=', req.user);
    res.redirect('/');
  }
);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

app.use('*', (req, res) => res.status(404).send('Url not found'));
app.use(handleError);

module.exports = app;
