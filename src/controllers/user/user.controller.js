// controller/user
import { users } from '../../../models/';
import { successResponse, errorResponse } from '../../helpers';

import { signToken } from '../../helpers/jwt';

const userController = {
  createUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const newUser = users.build({
        username,
        password,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      await newUser.save();
      res.redirect('/login');
      // return successResponse(req, res, { ...req.body });
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  },
  login: async (req, res) => {
    try {
      const { user } = req;
      return res.redirect('dash');
      // const jwt = signToken(user);
      // res.render('pages/dashboard', { jwt });
      // return successResponse(
      //   req,
      //   res,
      //   {
      //     jwt,
      //     user,
      //   },
      //   200,
      // );
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  },
};

export default userController;
