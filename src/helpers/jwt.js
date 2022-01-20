import * as JWT from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/index';

/**
 * @description This method will generate an jwt token on user login that will be used when calling protected apis
 * @author @sahilq
 * @param {object} user -> User for whom jwt is being generated
 * @returns {string} jwtToken -> Will be used by passport to authenticate logged in users
 */
export const signToken = (user) => {
  return JWT.sign(
    {
      username: user.username,
      sub: user.id,
      iat: new Date().getTime(),
    },
    JWT_SECRET,
    { expiresIn: '9d' },
  );
};
