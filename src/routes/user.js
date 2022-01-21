import express from 'express';
import passport from 'passport';

import validate from '../helpers/validator';

import userController from '../controllers/user/user.controller';

import * as userValidator from '../controllers/user/user.validator';

const router = express.Router();

// Authentication methods
import { passportSignIn, passportJWT } from '../helpers/authentication';

router.post(
  '/createUser',
  validate(userValidator.register),
  userController.createUser,
);

router.post(
  '/login',
  validate(userValidator.login),
  passportSignIn(),
  userController.login,
);

export default router;
