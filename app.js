require('dotenv').config();
import express from 'express';
import session from 'express-session';
import passport from 'passport';

import Routes from './src/routes';

import errorHandler from './src/middleware/errorHandler';

require('./config/sequelize');

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax

// Create the Express application
const app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- SESSION SETUP ----------------
 */

const store = new session.MemoryStore();

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  }),
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log(req.user);
//   next();
// });

/**
 * -------------- GET ROUTES ----------------
 */

// index page
app.get('/', function (req, res) {
  res.render('pages/index');
});

app.get('/login', function (req, res) {
  res.render('pages/login');
});
app.get('/register', function (req, res) {
  res.render('pages/register');
});

/**
 * -------------- POST ROUTES ----------------
 */

app.use('/api', Routes);

/**
 * -------------- Error Handler ----------------
 */

app.use(errorHandler);

app.use((req, res) => {
  return res.render('pages/404');
});

export default app;
