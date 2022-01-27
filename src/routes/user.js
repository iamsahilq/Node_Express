import express from 'express';
import passport from 'passport';

import validate from '../helpers/validator';

import userController from '../controllers/user/user.controller';

import * as userValidator from '../controllers/user/user.validator';

const router = express.Router();

// // Authentication methods
require('../../config/passport');
import {
  // passportSignIn,
  // passportJWT,
  // passportGoogle,
  isAuth,
} from '../helpers/authentication';
//require passport configuration
require('../../config/passport');

const passportSignIn = passport.authenticate('local', {
  failureRedirect: '/login-failure',
  successRedirect: 'login-success',
});

const passportGoogle = passport.authenticate('google', {
  scope: ['profile', 'email'],
  failureRedirect: '/api/users/login-failure',
  successRedirect: '/api/users/login-success',
});

router.post(
  '/createUser',
  validate(userValidator.register),
  userController.createUser,
);

router.post(
  '/login',
  validate(userValidator.login),
  passportSignIn,
  // passportSignIn(),
  // userController.login,
);
router.get('/dash', isAuth, function (req, res) {
  res.render('pages/dash');
});

router.get(
  '/auth/google',
  // passportGoogle(),
  passportGoogle,
);

router.get(
  '/auth/google/callback',
  // passportGoogle(),
  passportGoogle,
);

router.get('/login-success', (req, res, next) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/api/users/protected-route">Go to protected route</a></p>',
  );
});

router.get('/login-failure', (req, res, next) => {
  res.send('You entered the wrong password.');
});
router.get('/protected-route', isAuth, (req, res, next) => {
  res.send('You made it to the route.');
});

export default router;
