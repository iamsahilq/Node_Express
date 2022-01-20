//required libraries
import passport from 'passport';
import * as passportJwt from 'passport-jwt';
import * as passportLocal from 'passport-local';
import { ExtractJwt } from 'passport-jwt';

//local files
import { JWT_SECRET } from './config';
import { users } from './models/';
const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;

//JWT STRATEGY

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        // finding the user by user_id saved in token
        const user = await users.findByPk(payload.sub);
        // check if exists
        if (!user) {
          //handle not found
          return done(null, false);
        }
        //return user
        done(null, user);
      } catch (e) {
        done(e, false);
      }
    },
  ),
);

//LOCAL STRATEGY

passport.use(
  //local strategy uses Username
  new LocalStrategy(
    {
      usernameField: 'username',
    },
    async (username, password, done) => {
      try {
        // Find the user given the email
        const user = await users.findOne({
          where: {
            username,
          },
        });
        // If not, handle it
        if (!user) {
          return done(null, false);
        }
        // Check if the password is correct
        const isMatch = await user.validPassword(password);
        // If not, handle it
        if (!isMatch) {
          return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    },
  ),
);
