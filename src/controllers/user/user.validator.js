import Joi from 'joi';

export const getOtherUserProfile = Joi.object({
  userId: Joi.number().required(),
});

export const changePassword = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

export const register = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
