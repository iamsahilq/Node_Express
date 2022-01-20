import express from 'express';
import passport from 'passport';

import validate from '../helpers/validator';

import userController from '../controllers/user/user.controller';

import * as userValidator from '../controllers/user/user.validator';

require('../../passport');

const router = express.Router();

//passport methods to const
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.get('/', async (req, res) => {
  res.end(1);
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
  userController.login,
);

export default router;
