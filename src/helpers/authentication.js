// Get logger from external configuration source
/* global include */
/**
 * @global include -> custom require alternative for absolute paths
 * @author @sahilq
 * @file /helper/authorizationjs
 *
 * Helps with authorization using passport and jwt
 * contains local login and jwt authorizations
 *
 * @todo
 * role based authorization[]
 */

//require passport
import passport from 'passport';
//require passport configuration
require('../../passport');

export const passportSignIn = () => {
  return (req, res, next) => {
    passport.authenticate(
      'local',
      { session: false },
      function (err, user, info) {
        console.log('user :>> ', user);
        //check if any error
        if (err) {
          //log error
          //respond with error
          return res.status(500).send({
            status: 0,
            message: 'Error Occurred. Please Try Again.',
          });
        }
        //check if user exists
        if (!user) {
          //handle
          return res.status(400).render('pages/login', {
            errorMessage: 'Username/Password Incorrect.',
          });
        }
        req.user = user;

        //call next function in pipeline
        next();
      },
    )(req, res, next);
  };
};
export const passportJWT = () => {
  return (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      //log if any info
      //check if any error
      if (!user) {
        return res.status(403).send({ status: 0, message: 'invalid token' });
      }
      if (err) {
        //log error
        //respond with error
        return res
          .status(500)
          .send({ status: 0, message: 'Error Occurred. Please Try Again.' });
      }
      //check if user exists
      else if (!user) {
        //handle
        return res
          .status(401)
          .send({ status: 4, message: 'Incorrect Credentials' });
      }
      req.user = user;
      //call next function in pipeline
      next();
    })(req, res, next);
  };
};

export const passportGoogle = () => {
  return (req, res, next) => {
    passport.authenticate(
      'google',
      { scope: ['profile', 'email'], failureRedirect: '/login' },
      (err, user, info) => {
        console.log('user :>> ', user);
        //log if any info
        //check if any error
        if (!user) {
          return res.status(403).send({ status: 0, message: 'invalid token' });
        }
        if (err) {
          //log error
          //respond with error
          return res
            .status(500)
            .send({ status: 0, message: 'Error Occurred. Please Try Again.' });
        }
        //check if user exists
        else if (!user) {
          //handle
          return res
            .status(401)
            .send({ status: 4, message: 'Incorrect Credentials' });
        }
        req.user = user;
        //call next function in pipeline
        next();
      },
    )(req, res, next);
  };
};
