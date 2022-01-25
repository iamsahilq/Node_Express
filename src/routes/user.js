import express from 'express';
import passport from 'passport';

import validate from '../helpers/validator';

import userController from '../controllers/user/user.controller';

import * as userValidator from '../controllers/user/user.validator';

const router = express.Router();

// // Authentication methods
import {
  // passportSignIn,
  // passportJWT,
  passportGoogle,
} from '../helpers/authentication';
//require passport configuration
require('../../config/passport');

const passportSignIn = passport.authenticate('local', {
  failureRedirect: '/login-failure',
  successRedirect: 'login-success',
});

router.post(
  '/createUser',
  validate(userValidator.register),
  userController.createUser,
);

router.post(
  '/login',
  validate(userValidator.login),
  // passportSignIn(),
  passportSignIn,
  // userController.login,
);

router.get('/auth/google', passportGoogle());

router.get('/auth/google/callback', passportGoogle());

router.use((req, res, next) => next());

export default router;
